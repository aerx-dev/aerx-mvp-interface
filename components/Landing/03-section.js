import {
    Box,
    SimpleGrid,
    Center,
    Image as ChakraImage,
    useColorMode,
    Heading,
    Text,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";

function Feature3() {
    const { colorMode } = useColorMode();
    const { t } = useTranslation("landing");
    return (
        <Box height="400px" position="relative" maxWidth={800} margin="0 auto">
            <SimpleGrid columns={2} spacing={10}>
                <Box height="100%" width="100%">
                    <ChakraImage src="/friends.png" />
                </Box>
                <Box textAlign="left">
                    <Center height="100%">
                        <Box px={8} position="relative">
                            <ChakraImage
                                filter={
                                    colorMode === "light"
                                        ? "invert(1)"
                                        : "invert(0)"
                                }
                                src="/03.png"
                                width="140px"
                                position="absolute"
                                top={-10}
                                right={100}
                            />
                            <Heading>
                                {t("features.feature3.description")}
                            </Heading>
                            <Text m="2">{t("features.feature3.caption")}</Text>
                        </Box>
                    </Center>
                </Box>
            </SimpleGrid>
            <ChakraImage
                zIndex={-1}
                src="/grid.png"
                filter={colorMode === "light" ? "invert(1)" : "invert(0)"}
                width={400}
                position="absolute"
                top={0}
                right={"20%"}
            />
        </Box>
    );
}

export default Feature3;
