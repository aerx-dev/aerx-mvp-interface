import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";
import {
    SimpleGrid,
    Box,
    Center,
    Heading,
    Image as ChakraImage,
    useColorMode,
} from "@chakra-ui/react";

export default function Slider() {
    const [opacities, setOpacities] = useState([]);
    const { colorMode } = useColorMode();
    const [sliderRef] = useKeenSlider({
        slides: 3,
        loop: true,
        detailsChanged(s) {
            const new_opacities = s.track.details.slides.map(
                (slide) => slide.portion,
            );
            setOpacities(new_opacities);
        },
    });

    const images = [
        {
            words: (
                <Box px={8} position="relative">
                    <ChakraImage
                        filter={
                            colorMode === "light" ? "invert(1)" : "invert(0)"
                        }
                        src="/01.png"
                        width="140px"
                        position="absolute"
                        top={-20}
                        right={100}
                    />
                    <Heading>Make new friends</Heading>
                </Box>
            ),
            image: "/friends.png",
        },

        {
            words: (
                <Box px={8} position="relative">
                    <ChakraImage
                        filter={
                            colorMode === "light" ? "invert(1)" : "invert(0)"
                        }
                        src="/02.png"
                        width="160px"
                        position="absolute"
                        top={-20}
                        right={100}
                    />
                    <Heading>Earn for content</Heading>
                </Box>
            ),
            image: "/coins.png",
        },

        {
            words: (
                <Box px={8} position="relative">
                    <ChakraImage
                        filter={
                            colorMode === "light" ? "invert(1)" : "invert(0)"
                        }
                        src="/03.png"
                        width="160px"
                        position="absolute"
                        top={-20}
                        right={100}
                    />
                    <Heading>Free your media</Heading>
                </Box>
            ),
            image: "/multimedia.png",
        },
    ];

    return (
        <Box height="500px" position="relative" maxWidth={700} margin="0 auto">
            <div ref={sliderRef} className="fader">
                {images.map((el, idx) => (
                    <div
                        key={idx}
                        className="fader__slide"
                        style={{ opacity: opacities[idx] }}
                    >
                        <SimpleGrid columns={2} spacing={10}>
                            <Box textAlign="right">
                                <Center height="100%">{el.words}</Center>
                            </Box>
                            <Box height="100%" width="100%">
                                <ChakraImage src={el.image} />
                            </Box>
                        </SimpleGrid>
                    </div>
                ))}
            </div>

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
