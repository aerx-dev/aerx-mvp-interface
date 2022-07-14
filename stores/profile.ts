import create from "zustand";
import { ProfileStoreType } from "../types/stores";

const profileStore = create<ProfileStoreType>((set) => ({
    profile: null,
    setProfile: (profile) => set((state) => ({ ...state, profile })),

    follows: null,
    setFollows: (follows) => set((state) => ({ ...state, follows })),

    posts: null,
    setPosts: (posts) => set((state) => ({ ...state, posts })),
}));

export { profileStore };
