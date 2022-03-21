import { useEffect, useState } from "react";
import { nearStore } from "../stores/near";


export default function useFetchPosts() {

    const [refresh, setRefresh] = useState()
    const nearState = nearStore((state) => state)

    useEffect(() => {

        async function refreshPosts() {
            if (!nearState.cnftContract) {
                return
            }
            const resFeed = await nearState.cnftContract.nft_tokens() || [];
            // const contentFeed = resFeed.map((nft) => {
                //     return (
        //         {
            //             title: nft.title,
            //             token_id: nft.token_id,
            //             owner: nft.owner_id,
            //             created_at: nft.metadata.issued_at,
            //             updated_at: nft.metadata.updated_at,
            //             body: nft.metadata.description,
            //             media: nft.metadata.media,
            //             extra: nft.metadata.extra,
            //         })
            // })
            nearState.setFeed(resFeed.reverse())
            setRefresh(false)
        }
        if (refresh) {

            refreshPosts()
        }
    }, [refresh, nearState])

    return [refresh, setRefresh]
}