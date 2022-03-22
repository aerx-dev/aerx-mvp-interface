import create from "zustand";

const profileStore = create((set) => ({
    profile: null,
    setProfile: (profile) => set((state) => ({ profile })),

    follows: null,
    setFollows: (follows) => set((state) => ({ follows })),

    posts: null,
    setPosts: (posts) => set((state) => ({ posts })),
}));

export { profileStore };
