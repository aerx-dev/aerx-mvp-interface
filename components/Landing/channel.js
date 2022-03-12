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
            maxWidth={800}
            margin="0 auto"
            as="section"
        >
            <Center mt={20} mb={10}>
                <Box px={8} position="relative">
                    <Heading>The Project Channel</Heading>
                </Box>
            </Center>

            <Box height="100%" width="100%">
                <ChakraImage
                    src="/Frame.png"
                    filter={colorMode === "light" ? "invert(1)" : "invert(0)"}
                />
            </Box>
        </Box>
    );
}

export default Channel;
