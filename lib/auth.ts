import {
    connect,
    Contract,
    WalletConnection,
    keyStores,
    ConnectConfig,
    ConnectedWalletAccount,
} from "near-api-js";
import { create } from "ipfs-core";
import { getConfig } from "./config";
import contractFullAccessKey from "./contractCall";
import { NearStoreType } from "../types/stores";
import {
    DEX_CONTRACT_NAME,
    PROFILE_CONTRACT_NAME,
    TOKEN_CONTRACT_NAME,
} from "../utils/constants";
import {
    DexContract,
    ProfileContract,
    TokenContract,
} from "../types/contracts";

export async function initNearConnection(nearState: NearStoreType) {
    // Initialize connection to the NEAR testnet
    // await initIfps();

    const nearTokenConfig = getConfig(process.env.NODE_ENV);

    // See details in the official doc
    // https://near.github.io/near-api-js/interfaces/browserconnect.connectconfig.html#keystore-1
    const keyStore = new keyStores.BrowserLocalStorageKeyStore();
    const config: ConnectConfig = {
        ...nearTokenConfig,
        headers: {},
        keyStore,
    };

    const nearConnection = await connect(config);
    console.log("nearConnection : ", nearConnection);

    nearState.setConnection(nearConnection);

    // TODO: CHECK IF THE KEY IS NOT CAUSING LOCALSTORAGE ACCESS ISSUE
    const walletConnection = new WalletConnection(nearConnection, "Aerx");
    console.log("walletConnection : ", walletConnection);

    nearState.setWalletConnection(walletConnection);

    // Getting the Account ID. If still unauthorized, it's just empty string
    const accountId = walletConnection.getAccountId();
    console.log("accountId : ", accountId);

    if (!accountId) {
        console.error("ACCOUNTID IS EMPTY");
        return;
    }
    // TODO: CHECK IF THIS NEEDED AS WALLETCONNECTION IS STORED IN NEARSTORE
    // window.walletConnection = walletConnection;

    nearState.setAccountId(accountId);

    //.2 load tokenContract whenever it is ready
    await loadTokenContract(nearState, walletConnection.account());
    //3. load dex contract whenever it is ready
    await loadDexContrat(nearState, walletConnection.account());
    //.4 load profile with user as signer(incase aerx decide to let user pay)
    await loadProfileWithUserAsSigner(nearState, walletConnection.account());
    //.5 halt until pnftContract is set to state
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

export async function checkProfile(nearState: any) {
    // checks profile is initialised and user is connected
    if (nearState.pnftContract && nearState.accountId) {
        console.log("profile checking ...", nearState.profile);
        const has_registered = await nearState.pnftContract?.has_registered({
            user_id: nearState.accountId,
        });
        console.log("Has user registered? : ", has_registered);
        // composed the (image) and (extra) query fields
        if (has_registered) {
            const user_info = await nearState.pnftContract?.profile_by_id({
                user_id: nearState.accountId,
                user_to_find_id: nearState.accountId,
            });
            // check if the nft has extra fields
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
const loadTokenContract = (
    nearState: NearStoreType,
    account: ConnectedWalletAccount,
) => {
    const tokenContract: TokenContract = new Contract(
        account,
        TOKEN_CONTRACT_NAME,
        {
            // View methods are read only. They don't modify the state, but usually return some value.
            viewMethods: [
                "ft_balance_of",
                "get_owner",
                "ft_total_supply",
                "ft_metadata",
            ],
            changeMethods: [
                "claim_gift",
                "reward_users_for_anniversaries",
                "change_owner_to",
                "ft_transfer",
                "ft_transfer_call",
                "send_aex",
            ],
        },
    ) as TokenContract;

    nearState.setTokenContract(tokenContract);
    console.log("token contract:", tokenContract);
};

const loadDexContrat = (
    nearState: NearStoreType,
    account: ConnectedWalletAccount,
) => {
    const dexContract = new Contract(account, DEX_CONTRACT_NAME, {
        // View methods(read only methods).
        viewMethods: ["all_pools", "get_user_share"],
        //change methods(methods that change state)
        changeMethods: [
            "connect_or_get_balance",
            "create_pool",
            "lend",
            "swap_aex",
        ],
    }) as DexContract;
    nearState.setDexContract(dexContract);
    console.log("dexContract: ", dexContract);
};
const loadProfileWithUserAsSigner = (
    nearState: NearStoreType,
    account: ConnectedWalletAccount,
) => {
    const profileContractWithUserAsSigner = new Contract(
        account,
        PROFILE_CONTRACT_NAME,
        {
            // change methods(methods that change state)
            changeMethods: [
                "mint_post",
                "repost",
                "swap",
                "list_post_for_sale",
                "transfer_ownership",
                "buy_post",
            ],
            viewMethods: [
                "is_username_available",
                "has_registered",
                "profile_by_id",
                "post_details",
                "nft_tokens",
                "get_all_posts",
                "get_user_ids",
                "repost_details",
                "get_all_repost",
            ],
        },
    ) as ProfileContract;
    nearState.setProfileWithUserAsSigner(profileContractWithUserAsSigner);
};

async function loadPNFTContract(nearState: NearStoreType) {
    const pnftContract = await contractFullAccessKey("AerxProfileContract");
    if (!pnftContract) {
        throw new Error("Failed to create PNftContract");
    }
    nearState.setPNFTContract(pnftContract);
    console.log("pnft contract:", pnftContract);
}

export function logout(nearState: NearStoreType) {
    // TODO: NEED TO CONFIRM IF IT'S OK TO THROW
    if (!nearState.walletConnection) {
        throw new Error("wallet is not connected");
    }
    // reset store
    nearState.walletConnection.signOut();

    nearState.removeConnection();
    nearState.removeWalletConnection();

    // reload page
    window.location.replace(window.location.origin + window.location.pathname);
}

export async function loginToken(nearState: NearStoreType) {
    if (!nearState.walletConnection) {
        throw new Error("wallet is not connected");
    }

    await nearState.walletConnection.requestSignIn(
        TOKEN_CONTRACT_NAME,
        "",
        window.location.origin + "/account",
        "",
    );

    //todo: also maybe have a second URL like with like 404 or 401 / error page.
}
