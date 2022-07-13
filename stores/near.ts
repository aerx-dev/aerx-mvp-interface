import create from "zustand";
import { NearStoreType } from "../types/stores";

const nearStore = create<NearStoreType>((set) => ({
    connection: null,
    setConnection: (connection) => set((state) => ({ connection })),
    removeConnection: () => set((state) => ({ connection: null })),

    walletConnection: null,
    setWalletConnection: (walletConnection) =>
        set((state) => ({ ...state, walletConnection })),
    removeWalletConnection: () =>
        set((state) => ({ ...state, walletConnection: null })),

    accountId: null,
    setAccountId: (accountId) => set((state) => ({ ...state, accountId })),
    removeAccountId: () => set((state) => ({ ...state, accountId: null })),

    tokenContract: null,
    setTokenContract: (tokenContract) =>
        set((state) => ({ ...state, tokenContract })),
    removeTokenContract: () =>
        set((state) => ({ ...state, tokenContract: null })),

    profileContract: null,
    setProfileWithUserAsSigner: (profileContract) =>
        set((state) => ({ ...state, profileContract })),
    removeProfileWithUserAsSigner: () =>
        set((state) => ({ ...state, profileContract: null })),

    DexContract: null,
    setDexContract: (DexContract) =>
        set((state) => ({ ...state, DexContract })),
    removeDexContract: () => set((state) => ({ ...state, DexContract: null })),

    pnftContract: null,
    setPNFTContract: (pnftContract) =>
        set((state) => ({ ...state, pnftContract })),
    removeNFTContract: () => set((state) => ({ ...state, pnftContract: null })),

    profile: null,
    setProfile: (profile) => set((state) => ({ ...state, profile })),
    removeProfile: () => set((state) => ({ ...state, profile: null })),

    lastRes: null,
    setLastRes: (lastRes) => set((state) => ({ ...state, lastRes })),
    removeLastRes: () => set((state) => ({ ...state, lastRes: null })),

    feed: null,
    setFeed: (feed) => set((state) => ({ ...state, feed })),
    removeFeed: () => set((state) => ({ ...state, feed: null })),

    aexBalance: 0,
    setAexBalance: (aexBalance) => set((state) => ({ ...state, aexBalance })),
    removeAexBalance: () => set((state) => ({ ...state, aexBalance: 0 })),
}));

export { nearStore };
