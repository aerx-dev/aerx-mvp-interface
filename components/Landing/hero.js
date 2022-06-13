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

                    {/* <Box position={"absolute"} top={-20} left={50}>
            <CustomImage src="/images/decoration/blue.png" width={600} height={600} />
            </Box> */}
                    <GridItem
                        position="relative"
                        order={[1, 1, 2]}
                        colSpan={1}
                        colStart="auto"
                        height="auto"
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
                    <GridItem order={[2, 2, 1]} colSpan={1} paddingTop={10}>
                        <Heading
                            fontSize={"6xl"}
                            colorScheme={
                                colorMode === "light" ? "#322E65" : "#000"
                            }
                        >
                            Welcome to aerx
                        </Heading>
                        <Text fontSize="2xl" paddingTop={1} paddingBottom="20">
                            <Box
                                as="i"
                                colorScheme={
                                    colorMode === "light" ? "#322E65" : "#000"
                                }
                                opacity={0.8}
                                paddingBottom="20"
                            >
                                web 3 social media platform
                            </Box>{" "}
                            <br />
                        </Text>
                        <Text
                            paddingBottom="5"
                            // width="316px"
                            fontSize={"3xl"}
                            colorScheme={colorMode === "light" ? "#322E65" : "#000"}
                            opacity={0.5}
                        >
                            Aerx is a social media platform with a fundamentally
                            new approach to monetization of user content
                        </Text>
                        <Button
                            mt={4}
                            px={10}
                            py={6}
                            bgColor="#8D00FF"
                            color="white"
                            borderRadius={50}
                        >
                            Get Started
                        </Button>
                    </GridItem>
                </Grid>
            </WithDots>
        </WithStar>
        // <Box as="section" pt={100}>
        //     <Box position="relative">
        //         <ChakraImage
        //             zIndex={-1}
        //             src="/mesh.png"
        //             filter={colorMode === "light" ? "invert(1)" : "invert(0)"}
        //             width="100%"
        //             position="absolute"
        //             top="-200px"
        //         />
        //     </Box>
        //     <Heading textAlign={"center"} size="4xl" mb={2} fontWeight="bold">
        //         {t("heroSection.title")}

        //         <ChakraImage
        //             src={
        //                 colorMode === "light"
        //                     ? "/images/dark-logo.svg"
        //                     : "/images/white-logo.svg"
        //             }
        //             alt={t("logoAlt")}
        //             className="rounded-sm"
        //             layout="responsive"
        //             priority="true"
        //             display="inline"
        //             cursor={"pointer"}
        //             width={"150px"}
        //             position="relative"
        //             bottom="2px"
        //             marginLeft="12px"
        //         />
        //     </Heading>

        //     <Box position="relative">
        //         <ChakraImage
        //             zIndex={-1}
        //             src="/orb.svg"
        //             filter={colorMode === "light" ? "invert(1)" : "invert(0)"}
        //             width={700}
        //             position="absolute"
        //             top="-150px"
        //             right={"25%"}
        //         />
        //     </Box>

        //     <Heading textAlign={"center"}>
        //         {t("heroSection.subheading")}
        //     </Heading>
        //     <Text textAlign={"center"} m="2">
        //         {t("heroSection.caption")}
        //     </Text>

        //     <Box textAlign="center" display="none">
        //         <Button
        //             variant="outline"
        //             _hover={{ bg: "none" }}
        //             _active={{ bg: "none" }}
        //         >
        //             {t("heroSection.buttonText")}
        //         </Button>
        //     </Box>
        // </Box>
    );
}

export default HeroSection;
