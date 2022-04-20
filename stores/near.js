import create from "zustand";

const nearStore = create((set) => ({
    connection: null,
    setConnection: (connection) => set((state) => ({ connection })),
    removeConnection: () => set((state) => ({ connection: null })),

    walletConnection: null,
    setWalletConnection: (walletConnection) =>
        set((state) => ({ walletConnection })),
    removeWalletConnection: () => set((state) => ({ walletConnection: null })),

    accountId: null,
    setAccountId: (accountId) => set((state) => ({ accountId })),
    removeAccountId: () => set((state) => ({ accountId: null })),

    tokenContract: null,
    setTokenContract: (tokenContract) => set((state) => ({ tokenContract })),
    removeTokenContract: () => set((state) => ({ tokenContract: null })),

    pnftContract: null,
    setPNFTContract: (pnftContract) => set((state) => ({ pnftContract })),
    removeNFTContract: () => set((state) => ({ pnftContract: null })),

    cnftContract: null,
    setCNFTContract: (cnftContract) => set((state) => ({ cnftContract })),
    removeNFTContract: () => set((state) => ({ cnftContract: null })),

    profile: null,
    setProfile: (profile) => set((state) => ({ profile })),
    removeProfile: () => set((state) => ({ profile: null })),

    lastRes: null,
    setLastRes: (lastRes) => set((state) => ({ lastRes })),
    removeLastRes: () => set((state) => ({ lastRes: null })),

    feed: null,
    setFeed: (feed) => set((state) => ({ feed })),
    removeFeed: () => set((state) => ({ feed: null })),

    aexBalance: 0,
    setAexBalance: (aexBalance) => set((state) => ({ aexBalance })),
    removeAexBalance: () => set((state) => ({ aexBalance: 0 })),
    
}));

export { nearStore };
