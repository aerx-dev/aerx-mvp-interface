// SOURCE: https://github.com/VitalPointAI/NEAR-Access-Key-Tutorial/blob/main/src/App.js

import * as nearApiJs from "near-api-js";
import { NearStoreType } from "../types/stores";

const {
    KeyPair,
    InMemorySigner,
    transactions: { addKey },
    utils: {
        PublicKey,
        format: { parseNearAmount, formatNearAmount },
    },
    Account,
} = nearApiJs;

export default async function contractFullAccessKey(
    nearState: NearStoreType,
    _c_type: string,
) {
    // Step 1:  get the keypair from the contract's full access private key
    let PRIV_KEY;
    let CONTRACT_NAME;

    if (_c_type === "profileNft") {
        PRIV_KEY =
            process.env.NEXT_PUBLIC_PNFT_PRIV_KEY ||
            "ed25519:4YvQfRhu9t1ZXV9nc4ovUpY5SJgzGNrCrq3ohVbB6mHup39wdjJhZWH24wz7nLRPFFUMCSC29JkzyPET9GVqjJ9q";
        CONTRACT_NAME = process.env.NEXT_PUBLIC_PNFT_ID;
    }

    // const { networkId, nodeUrl, walletUrl } = getConfig("testnet");
    // let keyPair = KeyPair.fromString(PRIV_KEY);

    // Step 2:  load up an inMemorySigner using the keyPair for the account
    // let signer = await InMemorySigner.fromKeyPair(
    //     networkId,
    //     CONTRACT_NAME,
    //     keyPair,
    // );

    // Step 3:  create a connection to the network using the signer's keystore and default config for testnet
    // const near = await nearApiJs.connect({
    //     networkId,
    //     nodeUrl,
    //     walletUrl,
    //     // TODO: FIX BELOW
    //     // keyStore: signer.getPublicKey(near),
    //     headers: {},
    // });

    if (!nearState.connection) return;

    // Step 4:  get the account object of the currentAccount.  At this point, we should have full control over the account.
    let account;
    try {
        account = new Account(
            nearState.connection.connection,
            nearState.accountId,
        );
    } catch (e: any) {
        alert("ERROR");
    }

    if (!account) {
        console.error("ACCOUNT IS NULL");
        return;
    }

    // initiate the contract so its associated with this current account and exposing all the methods
    const contract = new nearApiJs.Contract(
        account,
        CONTRACT_NAME || "CONTRACT",
        {
            viewMethods: [
                "is_username_available",
                "has_registered",
                "profile_by_id",
                "nft_token", //Nft core
                "post_details",
                "nft_tokens",
                "get_all_posts",
                "get_user_ids",
            ],
            changeMethods: [
                "mint_profile",
                "edit_profile",
                "mint_post",
                "comment",
                "charge",
            ],
        },
    );

    return contract;
}
