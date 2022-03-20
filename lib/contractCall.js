// SOURCE: https://github.com/VitalPointAI/NEAR-Access-Key-Tutorial/blob/main/src/App.js

import * as nearApiJs from 'near-api-js'
import getConfig from "./config";
const {
    KeyPair,
    InMemorySigner,
    transactions: {
        addKey
    },
    utils: {
        PublicKey,
        format: {
            parseNearAmount, formatNearAmount
        }
    }
} = nearApiJs


async function contractFullAccessKey(_c_type) {

    // Step 1:  get the keypair from the contract's full access private key
    var PRIV_KEY;
    var CONTRACT_NAME;
    if (_c_type === "profileNft") {
        PRIV_KEY = process.env.NEXT_PUBLIC_PNFT_PRIV_KEY
        CONTRACT_NAME = process.env.NEXT_PUBLIC_PNFT_ID // "nft.3
    }
    else if (_c_type === "contentNft") {
        PRIV_KEY = process.env.NEXT_PUBLIC_CNFT_PRIV_KEY
        CONTRACT_NAME = process.env.NEXT_PUBLIC_CNFT_ID // "nft.3llobo.testnet"
    }
    else {
        console.error("Contract type not matched!!!")
    }
    const { networkId, nodeUrl, walletUrl } = getConfig("testnet")
    let keyPair = KeyPair.fromString(PRIV_KEY)

    // Step 2:  load up an inMemorySigner using the keyPair for the account
    let signer = await InMemorySigner.fromKeyPair(networkId, CONTRACT_NAME, keyPair)

    // Step 3:  create a connection to the network using the signer's keystore and default config for testnet
    const near = await nearApiJs.connect({
        networkId, nodeUrl, walletUrl, deps: { keyStore: signer.keyStore },
    })

    // Step 4:  get the account object of the currentAccount.  At this point, we should have full control over the account.
    let account = new nearApiJs.Account(near.connection, CONTRACT_NAME)

    // initiate the contract so its associated with this current account and exposing all the methods
    let contract = new nearApiJs.Contract(account, CONTRACT_NAME, {
        viewMethods: [
            "nft_token", //Core: https://nomicon.io/Standards/NonFungibleToken/Core#nft-interface
            "nft_total_supply",
            "nft_tokens",
            "nft_supply_for_owner",
            "nft_tokens_for_owner", //Enumeration: https://nomicon.io/Standards/NonFungibleToken/Enumeration#interface
        ],
        changeMethods: ['nft_mint', "nft_transfer"]
    })

    return contract
}


export { contractFullAccessKey };
