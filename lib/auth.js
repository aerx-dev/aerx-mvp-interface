import { connect, Contract, WalletConnection, keyStores } from "near-api-js";
import { create } from "ipfs-core";
import getConfig from "./config";
import { nearStore } from "../stores/near";
import { issueTokens, isUserRegistered, registerUser } from "./tokenContract";

const NFT_CONTRACT_NAME = "aerx-nft.innazh.testnet"; //to store user profile
const TOKEN_CONTRACT_NAME = "aerx-token.innazh.testnet"; //to manipulate aer tokens

export async function initNearConnection(state) {
    // Initialize connection to the NEAR testnet
    const nearTokenConfig = getConfig(process.env.NODE_ENV || "development");
    const nearConnection = await connect(
        Object.assign(
            { deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } },
            nearTokenConfig,
        ),
    );
    state.setConnection(nearConnection);

    // console.log("connection:");
    // console.log(nearConnection);

    const walletConnection = new WalletConnection(nearConnection);
    state.setWalletConnection(walletConnection);

    // console.log("wallet connection:");
    // console.log(window.walletConnection);

    // Getting the Account ID. If still unauthorized, it's just empty string
    // window.accountId = window.walletConnection.getAccountId()
    state.setAccountId(walletConnection.getAccountId());

    await loadTokenContract(state, walletConnection.account());
    await loadNFTContract(state, walletConnection.account());
    await initIfps();
}

async function initIfps() {
    window.ipfsIsOnline = false;
    const node = await create();
    window.ipfs = node;
    const nodeIsOnline = node.isOnline();
    window.ipfsIsOnline = nodeIsOnline;
    console.log("IFPS node is online: ", nodeIsOnline);
}
// Initializing our token contract APIs by contract name and configuration
async function loadTokenContract(state, account) {
    console.log(account);
    window.tokenContract = await new Contract(account, TOKEN_CONTRACT_NAME, {
        // View methods are read only. They don't modify the state, but usually return some value.
        viewMethods: [
            "ft_total_supply",
            "ft_balance_of",
            "storage_balance_bounds",
            "storage_balance_of",
        ],
        changeMethods: [
            "new_default_meta",
            "new", //public methods defined in our contract
            "ft_transfer",
            "ft_transfer_call",
            "ft_on_transfer",
            "ft_resolve_transfer", //FungibleTokenCore, docs: https://nomicon.io/Standards/FungibleToken/Core#reference-level-explanation
            "storage_deposit",
            "storage_withdraw",
            "storage_unregister",
        ], //https://nomicon.io/Standards/StorageManagement#reference-level-explanation
        sender: account.accountId,
    });
    state.setTokenContract(window.tokenContract);
    console.log("token contract:");
    console.log(window.tokenContract);
}

//TODO: needs to be finished, add methods, add a wrapper.
async function loadNFTContract(state, account) {
    // console.log(walletConnection);
    // Initializing our contract APIs by contract name and configuration
    window.NFTContract = await new Contract(account, NFT_CONTRACT_NAME, {
        // View methods are read only. They don't modify the state, but usually return some value.
        viewMethods: [
            "get_num", //our methods
            "nft_token", //Core: https://nomicon.io/Standards/NonFungibleToken/Core#nft-interface
            "nft_total_supply",
            "nft_tokens",
            "nft_supply_for_owner",
            "nft_tokens_for_owner", //Enumeration: https://nomicon.io/Standards/NonFungibleToken/Enumeration#interface
        ],
        // Change methods can modify the state. But you don't receive the returned value when called.
        changeMethods: [
            "new_default_meta",
            "new",
            "nft_mint", //our methods
            "nft_transfer",
            "nft_transfer_call", //Core: https://nomicon.io/Standards/NonFungibleToken/Core#nft-interface
        ],
        sender: account.accountId,
    });
    state.setNFTContract(window.NFTContract);
    console.log("nft contract:");
    console.log(window.NFTContract);
}

export function logout(state) {
    // reset store
    state.walletConnection.signOut();

    state.removeConnection();
    state.removeWalletConnection();

    // reload page
    window.location.replace(window.location.origin);
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
