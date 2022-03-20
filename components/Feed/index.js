import {
    Box,
    Heading,
    useColorModeValue,
    Grid,
    Text,
    Button,
} from "@chakra-ui/react";
import Content from "./content"

import NewPost from "../Post/new-post";
import Layout from "../Layout";
import { useEffect, useState } from "react";
import { contractFullAccessKey } from "../../lib/contractCall";


const Feed = () => {
    const picBg = useColorModeValue("gray.200", "gray.700");
    const postBg = useColorModeValue("gray.50", "gray.900");
    const imageBg = useColorModeValue("#fafafa", "#0a0a0a");
    const [contentNfts, setContentNft] = useState()

    async function getFeed() {
        const cnftContract = await contractFullAccessKey("contentNft")

        const resFeed = await cnftContract.nft_tokens({})
        console.log(resFeed)
        if (resFeed) {
            const contentFeed = resFeed.map((nft) => {
                return (
                    <Content
                        cnft={nft}
                        key={nft.token_id}
                    />
                )
            })
            setContentNft(contentFeed)
        }
    }

    return (
        <Layout>
            <Box
                className="px-4 md:px-10"
                py={4}
                zIndex={10}
                position={"relative"}
                minHeight="100vh"
            >
                <Grid
                    templateColumns={[
                        "repeat(100%)",
                        "repeat(100%)",
                        "220px calc(100% - 200px)",
                    ]}
                    gap="20px"
                >
                    <Box>
                        <Box
                            height="320px"
                            rounded="lg"
                            maxWidth={["100%", "400px", "225px"]}
                            bg={picBg}
                            margin="0 auto"
                        ></Box>
                    </Box>

                    <Box pr={8}>
                        <Box mb={4} >
                            <NewPost />
                            <Button
                                onClick={getFeed}
                                colorScheme="purple"
                                padding="11px" >
                                Update Feed
                            </Button>
                        </Box>
                        {contentNfts}
                    </Box>
                </Grid>
            </Box>
        </Layout>
    );
};

export default Feed;
