import { Near, WalletConnection } from "near-api-js";
import { DexContract, PNFTContract, ProfileContract } from "./contracts";

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

    profileContract: ProfileContract | null;
    setProfileWithUserAsSigner: (profileContract: ProfileContract) => void;
    removeProfileWithUserAsSigner: () => void;

    DexContract: DexContract | null;
    setDexContract: (DexContract: DexContract) => void;
    removeDexContract: () => void;

    pnftContract: PNFTContract | null;
    setPNFTContract: (pnftContract: PNFTContract) => void;
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

export type ProfileStoreType = {
    profile: any;
    setProfile: (profile: any) => void;

    follows: any;
    setFollows: (follows: any) => void;

    posts: any;
    setPosts: (posts: any) => void;
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
