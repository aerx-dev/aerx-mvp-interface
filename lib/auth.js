import { connect, Contract, WalletConnection, keyStores } from "near-api-js";
import { create } from "ipfs-core";
import getConfig from "./config";
import contractFullAccessKey from "../lib/contractCall";
import { nearStore } from "../stores/near";

const TOKEN_CONTRACT_NAME = "a_token.mohzcrea8me.testnet"; //to load aex_token contract
const PROFILECONTRACT_NAME = "a_profile.mohzcrea8me.testnet"; //to load aex_PROFILE contract

export async function initNearConnection(nearState) {
    // Initialize connection to the NEAR testnet
    // await initIfps();
    const nearTokenConfig = getConfig(process.env.NODE_ENV || "development");
    const nearConnection = await connect(
        Object.assign(
            { deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } },
            nearTokenConfig,
        ),
    );
    nearState.setConnection(nearConnection);

    const walletConnection = new WalletConnection(nearConnection);
    nearState.setWalletConnection(walletConnection);

    // Getting the Account ID. If still unauthorized, it's just empty string
    window.accountId = walletConnection.getAccountId();
    window.walletConnection = walletConnection;
    const accId = walletConnection.getAccountId();
    nearState.setAccountId(accId);

    //.2 load tokenContract whenever it is ready
    loadTokenContract(nearState, walletConnection.account());
    //.3 halt until pnftContract is set to state
	loadProfileTokenContract(nearState, walletConnection.account());
    await loadPNFTContract(nearState);
    // await set
}

export async function initIfps() {
    // window.ipfsIsOnline = false;
    const node = await create();
    window.ipfs = node;
    const nodeIsOnline = node.isOnline();
    // window.ipfsIsOnline = nodeIsOnline;
    console.log("IFPS node is online: ", nodeIsOnline);

    return { nodeIsOnline };
}

export async function checkProfile(nearState) {
    // checks profile is initialised and user is connected
    if (nearState.pnftContract && nearState.accountId) {
        console.log("profile checking ...", nearState.profile);
        const RegStatus = await nearState.pnftContract?.has_registered({
            account_id: nearState.accountId,
        });
        console.log(RegStatus);
        // composed the (image) and (extra) query fields
        if (RegStatus == true) {
            // check if the nft has extra fields
            const user_info = await nearState.pnftContract?.user_by_acct_id({
                account_id: nearState.accountId,
            });
            const extra = user_info.metadata?.extra
                ? JSON.parse(user_info.metadata.extra)
                : null;
            // check if the nft has media
            const image = user_info.metadata?.media
                ? user_info.metadata.media
                : null;
            // set profile to state
            nearState.setProfile({
                ...user_info,
                ...extra,
                profileImg: image,
            });
        }
    }
}
// Initializing our token contract APIs by contract name and configuration
async function loadTokenContract(nearState, account) {
    console.log("TOKEN ACC: ", account);
    window.tokenContract = new Contract(account, TOKEN_CONTRACT_NAME, {
        // View methods are read only. They don't modify the state, but usually return some value.
        viewMethods: ["balance_of", "aex_total_supply", "get_owner"],
        changeMethods: [
            "update_connection_status",
            "claim_gift",
            "send_aex",
            "reward_users_for_anniversaries",
            "change_owner_to",
        ],
        sender: account.accountId,
    });
    nearState.setTokenContract(window.tokenContract);
    console.log("token contract:", window.tokenContract);
}

async function loadProfileTokenContract(nearState, account) {
    console.log("TOKEN ProfileTC: ", account);
    window.profiletokenContract = new Contract(account, PROFILECONTRACT_NAME, {
        // View methods are read only. They don't modify the state, but usually return some value.
        viewMethods: [
            "is_username_available",
            "has_registered",
            "get_user_info",
            "user_by_acct_id",
            "post_details",
        ],
        changeMethods: [
            "mint_profile",
            "edit_profile",
            "mint_post",
            "comment",
            "charge",
            "transfer_ownership",
        ],
        sender: account.accountId,
    });
    nearState.setProfileTokenContract(window.profiletokenContract);
    console.log("profile contract:", window.profiletokenContract);
}

async function loadPNFTContract(nearState) {
    const pnftContract = await contractFullAccessKey("profileNft");
    nearState.setPNFTContract(pnftContract);
    console.log("pnft contract:", pnftContract);
}

export function logout(state) {
    // reset store
    state.walletConnection.signOut();

    state.removeConnection();
    state.removeWalletConnection();

    // reload page
    window.location.replace(window.location.origin + window.location.pathname);
}

export async function loginToken(state) {
    await state.walletConnection.requestSignIn(
        TOKEN_CONTRACT_NAME,
        "",
        window.location.origin + "/account",
        "",
    );
    //todo: also maybe have a second URL like with like 404 or 401 / error page.
}
