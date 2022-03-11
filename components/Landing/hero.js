import Image from "next/image";
import {
  Heading,
  Box,
  Button,
  Image as ChakraImage,
  useColorMode,
} from "@chakra-ui/react";
import Tilt from "react-parallax-tilt";

import useTranslation from "next-translate/useTranslation";

function HeroSection() {
  const { t } = useTranslation("landing");
  const { colorMode } = useColorMode();
  return (
    <Box as="section" pt={100}>
      <Heading textAlign={"center"} size="2xl" mb={2}>
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

      <Heading textAlign={"center"} mb={-10}>
        {t("heroSection.subheading")}
      </Heading>

      <Tilt>
        <ChakraImage
          width="420px"
          margin="0 auto"
          src="/token.png"
          alt="token"
        />
      </Tilt>

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
