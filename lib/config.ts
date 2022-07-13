import { ConnectConfig } from "near-api-js";
import { EnvType } from "../types/common";

export const getConfig = (env: EnvType): ConnectConfig => {
    switch (env) {
        case "production":
        case "mainnet":
            return {
                networkId: "testnet",
                nodeUrl: "https://rpc.testnet.near.org",
                walletUrl: "https://wallet.testnet.near.org",
                helperUrl: "https://helper.testnet.near.org",
                headers: {},
                // explorerUrl: "https://explorer.testnet.near.org",
            };
        case "development":
        case "testnet":
            return {
                networkId: "testnet",
                nodeUrl: "https://rpc.testnet.near.org",
                walletUrl: "https://wallet.testnet.near.org",
                helperUrl: "https://helper.testnet.near.org",
                headers: {},

                // explorerUrl: "https://explorer.testnet.near.org",
            };
        case "betanet":
            return {
                networkId: "betanet",
                nodeUrl: "https://rpc.betanet.near.org",
                walletUrl: "https://wallet.betanet.near.org",
                helperUrl: "https://helper.betanet.near.org",
                headers: {},

                // explorerUrl: "https://explorer.betanet.near.org",
            };
        case "local":
            return {
                networkId: process.env.NEAR_CLI_LOCALNET_NETWORK_ID || "local",
                nodeUrl: process.env.NEAR_NODE_URL || "http://localhost:3030",
                keyPath:
                    process.env.NEAR_CLI_LOCALNET_KEY_PATH ||
                    `${process.env.HOME}/.near/validator_key.json`,
                walletUrl:
                    process.env.NEAR_WALLET_URL ||
                    "http://localhost:4000/wallet",
                headers: {},
            };
        case "test":
        case "ci":
            return {
                networkId: "shared-test",
                nodeUrl: "https://rpc.ci-testnet.near.org",
                masterAccount: "test.near",
                headers: {},
            };
        case "ci-betanet":
            return {
                networkId: "shared-test-staging",
                nodeUrl: "https://rpc.ci-betanet.near.org",
                masterAccount: "test.near",
                headers: {},
            };
        default:
            throw Error(
                `Unconfigured environment '${env}'. Can be configured in src/config.js.`,
            );
    }
};
