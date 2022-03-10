import create from "zustand";

const profileStore = create((set) => ({
  profile: null,
  follows: null,
  posts: [],
  setProfile: (profile) => set((state) => ({ profile })),
  setFollows: (follows) => set((state) => ({ follows })),
  setPosts: (posts) => set((state) => ({ posts })),
}));

export { profileStore };
