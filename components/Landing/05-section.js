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

function Feature5() {
    const { colorMode } = useColorMode();
    const { t } = useTranslation("landing");
    return (
        <Box height="500px" position="relative" maxWidth={800} margin="0 auto">
            <Box textAlign="left">
                <Center height="100%">
                    <Box px={8} position="relative">
                        <ChakraImage
                            filter={
                                colorMode === "light"
                                    ? "invert(1)"
                                    : "invert(0)"
                            }
                            src="/05.png"
                            width="140px"
                            position="absolute"
                            top={-10}
                            right={100}
                        />
                        <Heading>{t("features.feature5.description")}</Heading>
                    </Box>
                </Center>
            </Box>
            <SimpleGrid columns={2}>
                <Box height="40%" width="40%" justifySelf={"flex-end"}>
                    <ChakraImage src="hand1.png" />
                </Box>
                <Box textAlign="left">
                    <Center height="100%">
                        <Box px={8} position="relative">
                            <Heading size="lg" mt={10} mb={7}>
                                {t("features.feature5.sub1.description")}
                            </Heading>
                            <Text>{t("features.feature5.sub1.caption")}</Text>
                        </Box>
                    </Center>
                </Box>
            </SimpleGrid>
            <SimpleGrid columns={2}>
                <Box height="40%" width="40%" justifySelf={"flex-end"}>
                    <ChakraImage src="hand2.png" />
                </Box>
                <Box textAlign="left">
                    <Center height="100%">
                        <Box px={8} position="relative">
                            <Heading size="lg" mt={10} mb={7}>
                                {t("features.feature5.sub2.description")}
                            </Heading>
                            <Text>{t("features.feature5.sub2.caption")}</Text>
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

export default Feature5;
