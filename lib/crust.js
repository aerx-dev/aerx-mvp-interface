import { ApiPromise, WsProvider } from "@polkadot/api";
import { typesBundleForPolkadot } from "@crustio/type-definitions";
import { Keyring } from "@polkadot/keyring";
import { cryptoWaitReady } from "@polkadot/util-crypto";
// crust account mnemonic
const mnemonic = process.env.NEXT_PUBLIC_CRUST_MNEMONIC;
// WS address of Crust chain --tesnet
const crustChainEndpoint = "wss://rpc-rocky.crust.network";

/**
 * Place storage order
 * @param api chain instance
 * @param fileCID the cid of file
 * @param fileSize the size of file in ipfs
 * @param tip tip for this order
 * @return true/false
 */
const placeOrder = async (api, keyRing, fileCID, fileSize, tip) => {
    const memo = "";
    // keyring pair will be used in sending transaction
    const keyRingPair = keyRing.addFromUri(mnemonic);
    // Determine whether to connect to the chain
    await api.isReadyOrError;
    // Generate transaction
    const tx = api.tx.market.placeStorageOrder(fileCID, fileSize, tip, memo);
    // Send transaction
    const txResponse = JSON.parse(
        JSON.stringify(await sendTx(keyRingPair, tx)),
    );
    return JSON.parse(JSON.stringify(txResponse));
};

/**
 * call on-chain interface to add prepaid money to an order
 * @param api chain instance
 * @param cid the cid of file
 * @param amount adding money to prepaid
 * @return send transaction true/false
 */
const addPrepaid = async (api, keyRing, cid, amount) => {
    // keyring pair will be used in sending transaction
    const keyRingPair = keyRing.addFromUri(mnemonic);
    await api.isReadyOrError;
    // Generate transaction
    const tx = api.tx.market.addPrepaid(cid, amount);
    // Send transaction
    const txRes = JSON.parse(JSON.stringify(await sendTx(keyRingPair, tx)));
    return JSON.parse(JSON.stringify(txRes));
};

const sendTx = async (keyringPair, tx) => {
    return new Promise((resolve, reject) => {
        tx.signAndSend(keyringPair, ({ events = [], status }) => {
            console.log(`💸  Tx status: ${status.type}, nonce: ${tx.nonce}`);

            if (status.isInBlock) {
                events.forEach(({ event: { method, section } }) => {
                    if (method === "ExtrinsicSuccess") {
                        console.log(`✅ success!`);
                        resolve(true);
                    }
                });
            } else {
                // Pass it
            }
        }).catch((e) => {
            reject(e);
        });
    });
};

/**
 * Get on-chain order information about files
 * @param api chain instance
 * @param cid the cid of file
 * @return order state
 */
const getOrderState = async (api, cid) => {
    await api.isReadyOrError;
    return await api.query.market.files(cid);
};

const upload = async (contentCid, contentSize) => {
    // Connect to crust chain --testnet
    const api = new ApiPromise({
        provider: new WsProvider(crustChainEndpoint),
        typesBundle: typesBundleForPolkadot,
    });
    const keyRing = new Keyring({
        type: "sr25519",
    });
    await cryptoWaitReady();
    const orderStatus = await placeOrder(api, keyRing, contentCid, contentSize, 0);
    console.log("Placing order was successful:  ", orderStatus);
    return orderStatus
};

export { upload };
