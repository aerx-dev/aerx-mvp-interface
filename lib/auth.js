import { connect, Contract, WalletConnection, keyStores } from "near-api-js";
import { create } from "ipfs-core";
import getConfig from "./config";
import contractFullAccessKey from "../lib/contractCall";

const TOKEN_CONTRACT_NAME = "a_token.mohzcrea8me.testnet"; //to load aex_token contract

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
    await loadTokenContract(nearState, walletConnection.account());
    //.3 halt until pnftContract is set to state
    await loadPNFTContract(nearState);
    // complete the initnearConnection
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
        const user_info = await nearState.pnftContract?.nft_tokens_for_owner({
            account_id: nearState.accountId,
        });
        console.log("user_info",user_info);
        // composed the (image) and (extra) query fields
        if (user_info?.length > 0) {
            // check if the nft has extra fields
            const extra = user_info[0].metadata?.extra
                ? JSON.parse(user_info[0].metadata.extra)
                : null;
            // check if the nft has media
            const image = user_info[0].metadata?.media
                ? user_info[0].metadata.media
                : null;
            // set profile to state
            nearState.setProfile({
                ...user_info[0],
                ...extra,
                profileImg: image,
            });
        }
    }
}

// Initializing our token contract APIs by contract name and configuration
export async function loadTokenContract(nearState, account) {
    console.log("TOKEN ACC: ", account);
    window.tokenContract = await new Contract(account, TOKEN_CONTRACT_NAME, {
        // View methods are read only. They don't modify the state, but usually return some value.
        viewMethods: ["balance_of", "ft_balance_of"],
        changeMethods: [
            "claim_gift",
            "reward_users_for_anniversaries",
            "change_owner_to",
            "send_aex",
        ],
        sender: account.accountId,
    });
    nearState.setTokenContract(window.tokenContract);
    console.log("token contract:", window.tokenContract);
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
