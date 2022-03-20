import { useState } from "react";
import {contractFullAccessKey} from "../lib/contractCall"



export default function useFetchPosts(accId) {

    const [posts, setPosts] = useState([])

    async function refreshPosts() {

        const cnftContract = await contractFullAccessKey("contentNft");
        const resFeed = accId ? await cnftContract.nft_tokens_for_owner({
            account_id: accId
        }) : [];
        const contentFeed = resFeed.map((nft) => {
            return (
                {
                    title: nft.title,
                    token_id: nft.token_id,
                    owner: nft.owner_id,
                    created_at: nft.metadata.issued_at,
                    updated_at: nft.metadata.updated_at,
                    body: nft.metadata.description,
                    media: nft.metadata.media,
                    extra: nft.metadata.extra,
                })
        })
        setPosts(contentFeed.reverse())
    }
    refreshPosts()

    return [posts, refreshPosts]
}