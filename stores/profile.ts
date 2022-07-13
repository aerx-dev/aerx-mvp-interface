import create from "zustand";

export type ProfileStoreType = {
    profile: any;
    setProfile: (profile) => void;

    follows: any;
    setFollows: (follows) => void;

    posts: any;
    setPosts: (posts) => void;
};

const profileStore = create<ProfileStoreType>((set) => ({
    profile: null,
    setProfile: (profile) => set((state) => ({ ...state, profile })),

    follows: null,
    setFollows: (follows) => set((state) => ({ ...state, follows })),

    posts: null,
    setPosts: (posts) => set((state) => ({ ...state, posts })),
}));

export { profileStore };
