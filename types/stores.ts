import { Near, WalletConnection } from "near-api-js";

// TODO: CHANGE ANY TYPE TO CUSTOM TYPE
export type NearStoreType = {
    connection: Near | null;
    setConnection: (connection: Near) => void;
    removeConnection: () => void;

    walletConnection: WalletConnection | null;
    setWalletConnection: (walletConnection: WalletConnection) => void;
    removeWalletConnection: () => void;

    accountId: any;
    setAccountId: (accountId) => void;
    removeAccountId: () => void;

    tokenContract: any;
    setTokenContract: (tokenContract) => void;
    removeTokenContract: () => void;

    profileContract: any;
    setProfileWithUserAsSigner: (profileContract) => void;
    removeProfileWithUserAsSigner: () => void;

    DexContract: any;
    setDexContract: (DexContract) => void;
    removeDexContract: () => void;

    pnftContract: any;
    setPNFTContract: (pnftContract) => void;
    removeNFTContract: () => void;

    profile: ProfileType | null;
    setProfile: (profile: ProfileType) => void;
    removeProfile: () => void;

    lastRes: any;
    setLastRes: (lastRes) => void;
    removeLastRes: () => void;

    feed: any[] | null;
    setFeed: (feed) => void;
    removeFeed: () => void;

    aexBalance: number;
    setAexBalance: (aexBalance) => void;
    removeAexBalance: () => void;
};

export type ProfileType = {
    username: string | undefined;
    fullName: string | undefined;
    aboutMe: string | undefined;
    hobbys: string | undefined;
    city: string | undefined;
    country: string | undefined;
    profileImg: string | undefined;
    [key: string]: any;
};
