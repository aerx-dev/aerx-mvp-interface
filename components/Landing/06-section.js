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

function Feature6() {
    const { colorMode } = useColorMode();
    const { t } = useTranslation("landing");
    return (
        <Box height="650px" position="relative" maxWidth={800} margin="0 auto">
            <Box textAlign="left">
                <Center height="100%">
                    <Box px={8} position="relative">
                        <ChakraImage
                            filter={
                                colorMode === "light"
                                    ? "invert(1)"
                                    : "invert(0)"
                            }
                            src="/06.png"
                            width="140px"
                            position="absolute"
                            top={-10}
                        />
                        <Heading mb="20">{t("useCase.title")}</Heading>
                    </Box>
                </Center>
            </Box>
            <SimpleGrid columns={3} spacing={10}>
                <Box height="100%" width="100%">
                    <ChakraImage
                        src="imgcontainer.png"
                        filter={
                            colorMode === "light" ? "invert(1)" : "invert(0)"
                        }
                    />
                    <Text m="2">{t("useCase.first")}</Text>
                </Box>
                <Box height="100%" width="100%">
                    <ChakraImage
                        src="imgcontainer.png"
                        filter={
                            colorMode === "light" ? "invert(1)" : "invert(0)"
                        }
                    />
                    <Text m="2">{t("useCase.second")}</Text>
                </Box>
                <Box height="100%" width="100%">
                    <ChakraImage
                        src="imgcontainer.png"
                        filter={
                            colorMode === "light" ? "invert(1)" : "invert(0)"
                        }
                    />
                    <Text m="2">{t("useCase.third")}</Text>
                </Box>
            </SimpleGrid>
            <Text mt="20" fontWeight="bold" fontSize="xl">
                {t("warning.description")}
            </Text>
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

export default Feature6;
