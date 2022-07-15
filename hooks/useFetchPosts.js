import { nearStore } from "../stores/near";

// re-wrote this to return a single callable function instead
// todo - modify this to append to feed state instead
// todo - to be called as the user scrolls down in the content page : opt

export default function useFetchPosts() {
    const nearState = nearStore((state) => state);

    async function refreshPosts() {
        if (nearState.pnftContract) {
            const responseFeed = await nearState.pnftContract
                ?.get_all_posts(
                    {
                        user_id: nearState.accountId,
                    }
                )
                .catch((e) => {
                    console.log("ERROR in usefetchpost");
                });
            console.log("All posts :", responseFeed);
            if (responseFeed) {
                nearState.setFeed(responseFeed.reverse());
            }
        }
    }

    return refreshPosts;
}
