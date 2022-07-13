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
    setAccountId: (accountId: any) => void;
    removeAccountId: () => void;

    tokenContract: any;
    setTokenContract: (tokenContract: any) => void;
    removeTokenContract: () => void;

    profileContract: any;
    setProfileWithUserAsSigner: (profileContract: any) => void;
    removeProfileWithUserAsSigner: () => void;

    DexContract: any;
    setDexContract: (DexContract: any) => void;
    removeDexContract: () => void;

    pnftContract: any;
    setPNFTContract: (pnftContract: any) => void;
    removeNFTContract: () => void;

    profile: ProfileType | null;
    setProfile: (profile: ProfileType) => void;
    removeProfile: () => void;

    lastRes: any;
    setLastRes: (lastRes: any) => void;
    removeLastRes: () => void;

    feed: any[] | null;
    setFeed: (feed: any) => void;
    removeFeed: () => void;

    aexBalance: number;
    setAexBalance: (aexBalance: any) => void;
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
