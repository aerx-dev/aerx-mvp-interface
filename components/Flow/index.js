import { Box, useColorModeValue, Grid, Button } from "@chakra-ui/react";
import NewPost from "../Post/new-post";
import Layout from "../Layout";
import { nearStore } from "../../stores/near";
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

const Flow = () => {
    const nearState = nearStore((state) => state);
    const picBg = useColorModeValue("gray.200", "gray.700");
    const postBg = useColorModeValue("gray.100", "gray.900");

    return (
        <Layout>
            <Box className="p-4 z-10 relative md:px-10 flex justify-center">
                <Box maxW={640}>
                    <Box mb={4}>
                        <NewPost state={nearState} bg={postBg} />
                    </Box>

                    {nearState.feed
                        ?.sort(function (a, b) {
                            return (
                                new Date(b.metadata.issued_at) -
                                new Date(a.metadata.issued_at)
                            );
                        })
                        .map((nft) => {
                            return <LazyPosts key={nft.token_id} nft={nft} />;
                        })}
                </Box>
            </Box>
        </Layout>
    );
};

export default Flow;
