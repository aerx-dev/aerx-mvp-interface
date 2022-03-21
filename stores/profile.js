import create from "zustand";

const profileStore = create((set) => ({
    profile: {
        // username: null,
        // fullName: null,
        // aboutMe: null,
        // hobbys: null,
        // city: null,
        // country: null,
        // profileImg: null,
        nearId: null,
        // signUpDate: null,
    },
    follows: null,
    posts: [],
    setProfile: (profile) => set((state) => ({ profile })),
    setFollows: (follows) => set((state) => ({ follows })),
    setPosts: (posts) => set((state) => ({ posts })),
}));

export { profileStore };
