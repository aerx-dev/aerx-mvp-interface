export const ENV_LIST = [
    "mainnet",
    "betanet",
    "testnet",
    "local",
    "ci",
    "ci-betanet",
] as const;

export type EnvType = typeof ENV_LIST[number] | NodeJS.ProcessEnv["NODE_ENV"];
