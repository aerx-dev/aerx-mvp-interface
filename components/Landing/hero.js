import {
    Heading,
    Box,
    Button,
    Image as ChakraImage,
    useColorMode,
    Text,
} from "@chakra-ui/react";

import useTranslation from "next-translate/useTranslation";

function HeroSection() {
    const { t } = useTranslation("landing");
    const { colorMode } = useColorMode();
    return (
        <Box as="section" pt={100}>
            <Box position="relative">
                <ChakraImage
                    zIndex={-1}
                    src="/mesh.png"
                    filter={colorMode === "light" ? "invert(1)" : "invert(0)"}
                    width="100%"
                    position="absolute"
                    top="-200px"
                />
            </Box>
            <Heading textAlign={"center"} size="4xl" mb={2} fontWeight="bold">
                {t("heroSection.title")}

                <ChakraImage
                    src={
                        colorMode === "light"
                            ? "/images/dark-logo.svg"
                            : "/images/white-logo.svg"
                    }
                    alt={t("logoAlt")}
                    className="rounded-sm"
                    layout="responsive"
                    priority="true"
                    display="inline"
                    cursor={"pointer"}
                    width={"150px"}
                    position="relative"
                    bottom="2px"
                    marginLeft="12px"
                />
            </Heading>

            <Box position="relative">
                <ChakraImage
                    zIndex={-1}
                    src="/orb.svg"
                    filter={colorMode === "light" ? "invert(1)" : "invert(0)"}
                    width={700}
                    position="absolute"
                    top="-150px"
                    right={"25%"}
                />
            </Box>

            <Heading textAlign={"center"}>
                {t("heroSection.subheading")}
            </Heading>
            <Text textAlign={"center"} m="2">
                {t("heroSection.caption")}
            </Text>

            <Box textAlign="center" display="none">
                <Button
                    variant="outline"
                    _hover={{ bg: "none" }}
                    _active={{ bg: "none" }}
                >
                    {t("heroSection.buttonText")}
                </Button>
            </Box>
        </Box>
    );
}

export default HeroSection;
