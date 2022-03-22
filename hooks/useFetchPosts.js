import { nearStore } from "../stores/near";
import { contractFullAccessKey } from "../lib/contractCall";

// re-wrote this to return a single callable function instead
// todo - modify this to append to feed state instead
// todo - to be called as the user scrolls down in the content page : opt

export default function useFetchPosts() {
    const nearState = nearStore((state) => state);

    async function refreshPosts() {
        const cnftContract = await contractFullAccessKey("contentNft");
        const responseFeed = await cnftContract.nft_tokens({});
        if (responseFeed) {
            nearState.setFeed(responseFeed.reverse());
        }
    }

    return refreshPosts;
}
