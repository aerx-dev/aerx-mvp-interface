import {
    Box,
    Center,
    Image as ChakraImage,
    useColorMode,
    Heading,
} from "@chakra-ui/react";

function Channel() {
    const { colorMode } = useColorMode();
    return (
        <Box
            height="500px"
            position="relative"
            maxWidth="95%"
            margin="0 auto"
            as="section"
        >
            <Center mt={20} mb={10}>
                <Box px={8} position="relative">
                    <Heading fontSize="6xl">About project</Heading>
                </Box>
            </Center>

            <Box height="100%" width="100%">
                <ChakraImage
                    src="/Frame.png"
                    backgroundColor="#8D00FF"
                    borderRadius="2xl"
                    // filter={colorMode === "light" ? "invert(1)" : "invert(0)"}
                />
            </Box>
        </Box>
    );
}

export default Channel;
