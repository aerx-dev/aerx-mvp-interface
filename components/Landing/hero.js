import {
    Heading,
    Box,
    Grid,
    GridItem,
    Button,
    Image as ChakraImage,
    useColorMode,
    Text,
} from "@chakra-ui/react";
// import Image from "next"
import useTranslation from "next-translate/useTranslation";
import WithStar from "../Hero/WithStars";
import WithDots from "../Hero/WithDots";
import CustomImage from "../Hero/CustomImage";

function HeroSection() {
    const { t } = useTranslation("landing");
    const { colorMode } = useColorMode();
    return (
        <WithStar>
            <WithDots>
                <Grid
                    minH="500px"
                    position="relative"
                    templateColumns="repeat(2, 1fr)"
                    mx="auto"
                    padding={20}
                    textAlign={["center", "center", "left"]}
                >
                    <Box
                        position={"absolute"}
                        display={["none", "block"]}
                        top={-20}
                        left={50}
                    >
                        <CustomImage src="/blue.png" width={600} height={600} />
                    </Box>
                    <GridItem
                        position="relative"
                        order={[1, 1, 2]}
                        colSpan={1}
                        colStart="auto"
                        height="auto"
                        alignItems={"center"}
                    >
                        <Box>
                            <CustomImage
                                position="relative"
                                objectFit="contain"
                                src="/saly-1.png"
                                alt="girl in rocket 3d"
                            />
                        </Box>
                    </GridItem>
                    <GridItem order={[2, 2, 1]} colSpan={1} paddingTop={8}>
                        <Heading
                            fontSize={"6xl"}
                            colorScheme={
                                colorMode === "light" ? "#322E65" : "#000"
                            }
                            display="flex"
                            alignItems="center"
                        >
                            {t("heroSection.title")}
                        </Heading>
                        <Text
                            fontSize="2xl"
                            paddingTop={1}
                            colorScheme={
                                colorMode === "light" ? "#322E65" : "#000"
                            }
                            paddingBottom="20"
                        >
                            <Box as="i" opacity={0.8} paddingBottom="20">
                                {t("heroSection.subheading")}
                            </Box>{" "}
                            <br />
                        </Text>
                        <Text
                            paddingBottom="5"
                            fontSize={"3xl"}
                            colorScheme={
                                colorMode === "light" ? "#322E65" : "#000"
                            }
                            opacity={0.5}
                        >
                            {t("heroSection.caption")}
                        </Text>
                        <Button
                            mt={4}
                            px={10}
                            py={6}
                            bgColor="#8D00FF"
                            color="white"
                            borderRadius={50}
                        >
                            {t("heroSection.buttonText")}
                        </Button>
                    </GridItem>
                </Grid>
            </WithDots>
        </WithStar>
    );
}

export default HeroSection;
