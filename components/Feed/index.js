import { Box, useColorModeValue, Grid, Button } from "@chakra-ui/react";
import NewPost from "../Post/new-post";
import Layout from "../Layout";
import { nearStore } from "../../stores/near";
import NFTCard from "../Profile/ProfileNFTCard";
import dynamic from "next/dynamic";

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

    async function getCharge(token_id) {
        nearState.cnftContract
            .get_charge({ token_id: token_id })
            .finally((res) => {
                return res;
            })
            .catch((err) => {
                console.log("GetCharge failed!", err);
                return 0;
            });
        // return res;
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
                            <NewPost state={nearState} bg={postBg} />
                        </Box>

                        {nearState.feed?.sort(function(a, b){return b.token_id-a.token_id}).map((nft) => {
                            return (
                                <LazyPosts
                                    key={nft.token_id}
                                    nft={nft}
                                    // charge={getCharge(nft.token_id) || 0}
                                />
                            );
                        })}
                    </Box>
                </Grid>
            </Box>
        </Layout>
    );
};

export default Feed;
