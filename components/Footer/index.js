import Link from "next/link";
import {
  Box,
  useColorMode,
  Image as ChakraImage,
  HStack,
} from "@chakra-ui/react";
import {
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoFacebook,
} from "react-icons/io5";
import useTranslation from "next-translate/useTranslation";

function Footer() {
  const { t } = useTranslation("footer");
  const { colorMode } = useColorMode();

  return (
    <Box as="footer" className="px-4 py-10 md:px-10" pt={100}>
      <Box textAlign={"center"}>
        <Link href="/">
          <ChakraImage
            src={
              colorMode === "light"
                ? "/images/dark-logo.svg"
                : "/images/white-logo.svg"
            }
            alt={t("logoAlt")}
            className="rounded-sm"
            layout="responsive"
            margin="0 auto"
            lazyload="true"
            mb={8}
            cursor={"pointer"}
            width={"150px"}
          />
        </Link>

        <HStack fontSize="2xl" spacing={5} justifyContent={"center"}>
          <Box
            _hover={{ opacity: 0.6 }}
            cursor={"pointer"}
            transition="0.3s ease"
          >
            <IoLogoFacebook />
          </Box>
          <Box
            _hover={{ opacity: 0.6 }}
            cursor={"pointer"}
            transition="0.3s ease"
          >
            <IoLogoTwitter />
          </Box>
          <Box
            _hover={{ opacity: 0.6 }}
            cursor={"pointer"}
            transition="0.3s ease"
          >
            <IoLogoInstagram />
          </Box>
        </HStack>
      </Box>
    </Box>
  );
}

export default Footer;
