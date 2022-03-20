import {
    Box,
    Heading,
    useColorModeValue,
    Grid,
    Text,
    Button,
} from "@chakra-ui/react";

import NewPost from "../Post/new-post";
import Layout from "../Layout";
import { nearStore } from "../../stores/near";
import NFTCard from "../Profile/ProfileNFTCard";
import dynamic from "next/dynamic";
import { contractFullAccessKey } from "../../lib/contractCall";
import { useState } from "react";


// important ! reduce load time. lazyLoad feeder during fetch
const LazyPosts = dynamic(() => import("../Post/post"), {
    loading: () => (
        <Button
            isLoading
            variant="ghost"
            position="absolute"
            left="50vw"
            top="50vh"
            disabled
        />
    ),
});


const Feed = () => {
    const nearState = nearStore((state) => state);
    const picBg = useColorModeValue("gray.200", "gray.700");
    const postBg = useColorModeValue("gray.100", "gray.900");

    const [contentNfts, setContentNft] = useState()

    async function getFeed() {
        const cnftContract = await contractFullAccessKey("contentNft")

        const resFeed = await cnftContract.nft_tokens({})
        console.log(resFeed)
        if (resFeed) {
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
                    }
                )
            })
            setContentNft(contentFeed.reverse())
        }
    }


    return (
        <Layout>
            <Box className="p-4 z-10 relative md:px-10">
                <Grid
                    templateColumns={["repeat(100%)", "20vw calc(100% - 25vw)"]}
                    gap="20px"
                >
                    <NFTCard bg={picBg} />

                    <Box maxW={640}>
                        <Box mb={4}>
                            <Button
                                onClick={getFeed}
                                colorScheme="purple"
                                padding="11px" >
                                Update Feed
                            </Button>
                        </Box>
                        <Box mb={4}>
                            <NewPost state={nearState} bg={postBg} />
                        </Box>

                        {contentNfts && contentNfts.map((el) => {
                            return <LazyPosts
                                el={el}
                                key={el.token_id + "pro"} />;
                        })}
                    </Box>
                </Grid>
            </Box>
        </Layout>
    );
};

export default Feed;
