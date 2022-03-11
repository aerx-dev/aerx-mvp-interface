import {
    Box,
    useColorModeValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    Image as ChakraImage,
} from "@chakra-ui/react";

import { profileStore } from "../../stores/profile";
import { useState } from "react";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { sendToken } from "../../lib/tokenContract";
import { nearStore } from "../../stores/near";

function Post({ el }) {
    const nearState = nearStore((state) => state);
    const postBg = useColorModeValue("white", "gray.900");
    const sliderTrack = useColorModeValue("yellow.400", "yellow.400");
    const sliderTrackBg = useColorModeValue("yellow.100", "yellow.100");
    const sliderThumbColor = useColorModeValue("gray.900", "gray.900");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [sliderValue, setSliderValue] = useState(0);
    let profileState = profileStore((state) => state);
    if (!profileState) {
        profileState = {};
    }

    function updateSlider(e) {
        setSliderValue(e);
    }
    function sendMoney() {
        //todo: send money here
        console.log(nearState.profile);
        // sendToken(nearState);
        onClose();
    }

    return (
        <>
            <Box
                cursor={"pointer"}
                onClick={onOpen}
                key={el + "pro"}
                bg={postBg}
                rounded="lg"
                borderWidth={2}
                mb={4}
            >
                <Box
                    borderBottom={2}
                    p={4}
                    display="flex"
                    alignContent={"center"}
                    gap={2}
                >
                    <Box
                        display="inline-block"
                        height="40px"
                        width="40px"
                        bg="gray.500"
                        rounded="full"
                        overflow={"hidden"}
                    >
                        <ChakraImage
                            src={profileState.profile.profileImage}
                            objectFit="cover"
                            alt={profileState.profile.fullName}
                        />
                    </Box>

                    <Box fontSize="lg" pt={1}>
                        {profileState.profile.fullName}
                    </Box>
                </Box>

                <Box px={4}>
                    <Box mb={1}>{el.body}</Box>

                    <Box>
                        <small>{el.created_at}</small>
                    </Box>
                </Box>

                <Box borderTop={2} p={4}>
                    <AiOutlineThunderbolt style={{ display: "inline" }} />{" "}
                    {[10, 20, 30, 40][Math.floor(Math.random() * 4)]}
                </Box>
            </Box>

            <Modal
                size="xl"
                isOpen={isOpen}
                onClose={() => {
                    setSliderValue(0);
                    onClose();
                }}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Reward Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box pb={4} display="flex" alignContent={"center"} gap={2}>
                            <Box
                                display="inline-block"
                                height="40px"
                                width="40px"
                                bg="gray.500"
                                rounded="full"
                                overflow={"hidden"}
                            >
                                <ChakraImage
                                    src={profileState.profile.profileImage}
                                    objectFit="cover"
                                    alt={profileState.profile.fullName}
                                />
                            </Box>

                            <Box fontSize="lg" pt={1}>
                                {profileState.profile.fullName}
                            </Box>
                        </Box>

                        {el.body}

                        <Box py={2} display="flex" pr={2}>
                            <Box fontSize="2xl" mr={4}>
                                <AiOutlineThunderbolt style={{ display: "inline-block" }} />
                            </Box>

                            <Slider
                                onChange={updateSlider}
                                size={"lg"}
                                aria-label="pay-slider"
                                colorScheme={"yellow"}
                                defaultValue={0}
                            >
                                <SliderTrack bg={sliderTrackBg}>
                                    <SliderFilledTrack bg={sliderTrack} />
                                </SliderTrack>
                                <SliderThumb color={sliderThumbColor} boxSize={6}>
                                    <small>{sliderValue}</small>
                                </SliderThumb>
                            </Slider>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            variant="ghost"
                            mr={3}
                            onClick={() => {
                                setSliderValue(0);
                                onClose();
                            }}
                        >
                            Close
                        </Button>
                        <Button colorScheme="blue" onClick={sendMoney}>
                            Confirm
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default Post;
