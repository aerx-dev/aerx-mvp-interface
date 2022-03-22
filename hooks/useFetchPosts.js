import { nearStore } from "../stores/near";

// re-wrote this to return a single callable function instead
// todo - modify this to append to feed state instead
// todo - to be called as the user scrolls down in the content page : opt

export default function useFetchPosts() {
    const nearState = nearStore((state) => state);

    async function refreshPosts() {
        if (nearState.cnftContract) {
            const responseFeed = await nearState.cnftContract?.nft_tokens();
            if (responseFeed) {
                nearState.setFeed(responseFeed.reverse());
            }
        }
    }

    return refreshPosts;
}
