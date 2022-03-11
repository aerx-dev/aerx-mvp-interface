import {
    Heading,
    Box,
    Flex,
    Image as ChakraImage,
    useColorMode,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";

function Team() {
    const { colorMode } = useColorMode();
    const { t } = useTranslation("landing");
    const team = [
        {
            name: "Pav",
            image: "/pavel.png",
        },

        {
            name: "Flo Wolf",
            image: "/lobo.jpeg",
        },

        {
            name: "Max",
            image: "/max.png",
        },

        {
            name: "Kondwani",
            image: "/kondwani.jpeg",
        },

        {
            name: "Inna",
            image: "/inna.png",
        },

        {
            name: "Sam",
            image: "/sam.png",
        },

        {
            name: "Sajal",
            image: "/sajal.png",
        },
    ];
    return (
        <Box as="section" mb={50}>
            <Heading textAlign={"center"} mb={12}>
                {t("team.heading")}
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

            <Flex
                maxWidth={800}
                margin="0 auto"
                flexWrap="wrap"
                justifyContent={"center"}
                gap={5}
            >
                {team.map((el) => {
                    return (
                        <Box p={4} key={el.title}>
                            <Box
                                height="120px"
                                width="120px"
                                bg="gray.500"
                                rounded="full"
                                overflow="hidden"
                            >
                                <ChakraImage src={el.image} alt={el.name} />
                            </Box>
                        </Box>
                    );
                })}
            </Flex>
        </Box>
    );
}

export default Team;
