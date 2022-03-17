import Image from "next/image";
import Link from "next/link";
import {
    Box,
    useColorMode,
    Image as ChakraImage,
    HStack,
    SimpleGrid,
    Text,
} from "@chakra-ui/react";
import EmailCapture from "../Landing/email-capture";
import { IoLogoDiscord, IoLogoTwitter } from "react-icons/io5";
import useTranslation from "next-translate/useTranslation";

function Footer() {
    const { t } = useTranslation("footer");
    const { colorMode } = useColorMode();

    return (
        <Box as="footer" pt="25rem">
            <SimpleGrid columns={2} spacing={10}>
                <Box textAlign={"center"}>
                    <Link href="/">
                        <ChakraImage
                            src="/images/white-logo.svg"
                            alt={t("logoAlt")}
                            className="rounded-sm"
                            layout="responsive"
                            margin="0 auto"
                            lazyload="true"
                            mb={8}
                            cursor={"pointer"}
                            width={"150px"}
                            filter={
                                colorMode === "light"
                                    ? "invert(1)"
                                    : "invert(0)"
                            }
                        />
                    </Link>
                    <Text fontWeight="bold"> The future has arrived</Text>
                    <Text fontWeight="bold">emailexample@aerx.com</Text>
                </Box>
                <Box height="100%" width="100%">
                    <EmailCapture />
                    <HStack
                        fontSize="2xl"
                        spacing={5}
                        justifyContent={"flex-start"}
                    >
                        <Box
                            _hover={{ opacity: 0.6 }}
                            cursor={"pointer"}
                            transition="0.3s ease"
                        >
                            <IoLogoDiscord />
                        </Box>
                        <Box
                            _hover={{ opacity: 0.6 }}
                            cursor={"pointer"}
                            transition="0.3s ease"
                        >
                            <IoLogoTwitter />
                        </Box>
                    </HStack>
                </Box>
            </SimpleGrid>
            <ChakraImage
                zIndex={-1}
                src="/footerimg2.png"
                maxWidth={"100vw"}
                position="absolute"
                bottom="-10vh"
                filter={colorMode === "light" ? "opacity(0.7)" : "opacity(0.5)"}
            />
        </Box>
    );
}

export default Footer;
