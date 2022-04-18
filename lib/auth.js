import { connect, Contract, WalletConnection, keyStores } from "near-api-js";
import { create } from "ipfs-core";
import getConfig from "./config";
import { isUserRegistered, registerUser } from "./tokenContract";
import contractFullAccessKey from "../lib/contractCall";
import { nearStore } from "../stores/near";

// const PROFILE_NFT_CONTRACT_NAME = "aerx_profile.3llobo.testnet"; //to store user profile
// const CONTENT_NFT_CONTRACT_NAME = "nft.3llobo.testnet"; //to store user profile
const TOKEN_CONTRACT_NAME = "aex_token.3llobo.testnet"; //to manipulate aer tokens

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
    //.4 halt until cnftContract is set to state
    await loadCNFTContract(nearState);
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
    // 1 check if user is logged and contract is initialized
    if (nearState.accountId && nearState.pnftContract) {
        console.log("profile checking ...", nearState.profile);
        const profileNft = await nearState.pnftContract?.nft_tokens_for_owner({
            account_id: nearState.accountId,
        });
        console.log(profileNft);
        // composed the (image) and (extra) query fields
        if (profileNft?.length > 0) {
            // check if the nft has extra fields
            const extra = profileNft[0].metadata?.extra
                ? JSON.parse(profileNft[0].metadata.extra)
                : null;
            // check if the nft has media
            const image = profileNft[0].metadata?.media
                ? profileNft[0].metadata.media
                : null;
            // set profile to state
            nearState.setProfile({
                ...profileNft[0],
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
        viewMethods: [
            "ft_total_supply",
            "ft_balance_of",
            "is_registered",
            "get_min_balance",
            "get_nftpremie",
            "get_nftId",
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
    console.log(window.tokenContract);
}

//TODO: needs to be finished, add methods, add a wrapper.
async function loadPNFTContract(nearState) {
    // console.log(walletConnection);
    // Initializing our contract APIs by contract name and configuration
    // window.PNFTContract = await new Contract(account, PROFILE_NFT_CONTRACT_NAME, {
    //     // View methods are read only. They don't modify the state, but usually return some value.
    //     viewMethods: [
    //         ...nftViewMethods,
    //         ...tokenStorageViewMethods,
    //     ],
    //     // Change methods can modify the state. But you don't receive the returned value when called.
    //     changeMethods: [
    //         ...nftChangeMethods,
    //         ...tokenStorageChangeMethods,
    //     ],
    //     // sender: account.accountId,
    // });
    const pnftContract = await contractFullAccessKey("profileNft");
    nearState.setPNFTContract(pnftContract);
    console.log("pnft contract:", pnftContract);
}

//TODO: needs to be finished, add methods, add a wrapper.
async function loadCNFTContract(nearState) {
    // console.log(walletConnection);
    // Initializing our contract APIs by contract name and configuration
    // window.CNFTContract = await new Contract(account, CONTENT_NFT_CONTRACT_NAME, {
    //     // View methods are read only. They don't modify the state, but usually return some value.
    //     viewMethods: [
    //         ...nftViewMethods,
    //         ...tokenStorageViewMethods,
    //     ],
    //     // Change methods can modify the state. But you don't receive the returned value when called.
    //     changeMethods: [
    //         ...nftChangeMethods,
    //         ...tokenStorageChangeMethods,
    //     ],
    //     // sender: CONTENT_NFT_CONTRACT_NAME,
    // });
    const cnftContract = await contractFullAccessKey("contentNft");
    nearState.setCNFTContract(cnftContract);
    console.log("cnft contract:", cnftContract);

    var responseFeed =
        (await cnftContract.nft_tokens({}).catch((err) => {
            console.error(err);
        })) || [];
    if (responseFeed) {
        nearState.setFeed(responseFeed.reverse());
    }

    // Get the data from the database here
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

// https://nomicon.io/Standards/StorageManagement
const tokenStorageViewMethods = [
    "storage_balance_bounds",
    "storage_balance_of", // account_id: string
];

const tokenStorageChangeMethods = [
    "storage_deposit", // account_id: string|null, registration_only: boolean|null
    "storage_withdraw", // amount: string|null
    "storage_unregister", // force: boolean|null
];

const nftViewMethods = [
    "nft_token", //Core: https://nomicon.io/Standards/NonFungibleToken/Core#nft-interface
    "nft_total_supply",
    "nft_tokens",
    "nft_supply_for_owner",
    "nft_tokens_for_owner", //Enumeration: https://nomicon.io/Standards/NonFungibleToken/Enumeration#interface
];

const nftChangeMethods = ["nft_mint", "nft_transfer"];
