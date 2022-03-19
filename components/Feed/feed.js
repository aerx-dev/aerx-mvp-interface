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

                        {[1, 2, 3].map((el) => {
                            return <LazyPosts key={el + "pro"} />;
                        })}
                    </Box>
                </Grid>
            </Box>
        </Layout>
    );
};

export default Feed;
