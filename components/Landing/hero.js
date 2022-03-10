import Image from "next/image";
import {
    Heading,
    Box,
    Button,
    Image as ChakraImage,
    useColorMode,
    Text,
} from "@chakra-ui/react";
import Tilt from "react-parallax-tilt";

import useTranslation from "next-translate/useTranslation";

function HeroSection() {
    const { t } = useTranslation("landing");
    const { colorMode } = useColorMode();
    return (
        <Box as="section" pt={100}>
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
                    width={"100px"}
                    position="relative"
                    bottom="2px"
                    marginLeft="12px"
                />
            </Heading>

            <Box position="relative">
                <ChakraImage
                    zIndex={-1}
                    src="/grid.png"
                    filter={colorMode === "light" ? "invert(1)" : "invert(0)"}
                    width={400}
                    position="absolute"
                    top={0}
                    right={"30%"}
                />
            </Box>

            <Heading textAlign={"center"} mb="2">
                {t("heroSection.subheading")}
            </Heading>
            <Text fontSize="sm" textAlign={"center"} fontStyle="italic">
                {t("heroSection.caption")}
            </Text>

            <Box textAlign="center" mt="10">
                <Button
                    variant="outline"
                    _hover={{ bg: "none" }}
                    _active={{ bg: "none" }}
                    sx={{ borderRadius: 20 }}
                >
                    {t("heroSection.buttonText")}
                </Button>
            </Box>
        </Box>
    );
}

export default HeroSection;
