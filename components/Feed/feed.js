import {
    Box,
    Heading,
    useColorModeValue,
    Grid,
    Text,
    Button,
} from "@chakra-ui/react";

import { AiOutlineThunderbolt } from "react-icons/ai";
import NewPost from "../Post/new-post";
import Layout from "../Layout";

const Feed = () => {
    const picBg = useColorModeValue("gray.200", "gray.700");
    const postBg = useColorModeValue("gray.50", "gray.900");
    const imageBg = useColorModeValue("#fafafa", "#0a0a0a");
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
                        <Box mb={4}>
                            <NewPost />
                        </Box>

                        {[1, 2, 3, 4].map((el) => {
                            return (
                                <Box
                                    key={el + "pro"}
                                    bg={postBg}
                                    rounded="lg"
                                    borderWidth={2}
                                    mb={4}
                                >
                                    <Box
                                        borderBottom={2}
                                        p={4}
                                        display="flex"
                                        alignContent={"center"}
                                        gap={2}
                                    >
                                        <Box
                                            display="inline-block"
                                            height="40px"
                                            width="40px"
                                            bg="gray.500"
                                            rounded="full"
                                        ></Box>

                                        <Box fontSize="lg" pt={1}>
                                            nkfdjsan
                                        </Box>
                                    </Box>
                                    <Box px={4}>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit.
                                    </Box>
                                    <Box borderTop={2} p={4}>
                                        <AiOutlineThunderbolt
                                            style={{ display: "inline" }}
                                        />{" "}
                                        {
                                            [10, 20, 30, 40][
                                                Math.floor(Math.random() * 4)
                                            ]
                                        }
                                    </Box>
                                </Box>
                            );
                        })}
                    </Box>
                </Grid>
            </Box>
        </Layout>
    );
};

export default Feed;
