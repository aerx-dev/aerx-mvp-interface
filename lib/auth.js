import { connect, Contract, WalletConnection, keyStores } from "near-api-js";
import { create } from "ipfs-core";
import getConfig from "./config";
import { isUserRegistered, registerUser } from "./tokenContract";
import contractFullAccessKey from "../lib/contractCall";
import { nearStore } from "../stores/near";

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
    loadTokenContract(nearState, walletConnection.account());
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
        console.log("profile checking ...", nearState.profile);
        const profileNft = await nearState.pnftContract?.has_registered({
            account_id: nearState.accountId,
        });
        console.log(profileNft);
        // composed the (image) and (extra) query fields
        if (profileNft == true) {
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
                ...profileNft[0],
                ...extra,
                profileImg: image,
            });
        }
    } else {
        // if not alert user and take user back to origin page
        window.alert(
            "Error checking Contract state and your near account, try again later",
        );
        window.location.origin;
    }
}
// Initializing our token contract APIs by contract name and configuration
async function loadTokenContract(nearState, account) {
    console.log("TOKEN ACC: ", account);
    window.tokenContract = new Contract(account, TOKEN_CONTRACT_NAME, {
        // View methods are read only. They don't modify the state, but usually return some value.
        viewMethods: [
            "ft_total_supply",
            "ft_balance_of",
            "is_registered",
            "get_min_balance",
            "get_nft_premie",
            "get_nft_id",
            ...tokenStorageViewMethods,
        ],
        changeMethods: [
            //https://nomicon.io/Standards/StorageManagement#reference-level-explanation
            "ft_transfer",
            ...tokenStorageChangeMethods,
        ],
        sender: account.accountId,
    });
    nearState.setTokenContract(window.tokenContract);
    console.log("token contract:");
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

export async function registerUserIfNotRegistered(state) {
    let result = await isUserRegistered(state);
    if (!result) {
        let data = await registerUser(state);
        console.log("after register user:");
        console.log(data);
    } else {
        console.log("already registered!");
    }
}

//UNDER CONSTRUCTION:
// export async function loginNFT(state) {
//     console.log("start login nft");
//     console.log(NFT_CONTRACT_NAME);
//     await window.walletConnection.requestSignIn(NFT_CONTRACT_NAME, "", "", ""); //todo: convert this to relative URL OR put in a env/const somewhere
//     console.log("end login nft");
// }

//TODO: finish sign-in/sign-out & add contract view & change functions to def.
//add sender acc object(figure where to get it from) & create wrapper functions around smart contract functions, in a separate file, perhaps
//generate the keys
