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
    //SliderMark,
    Image as ChakraImage,
    Text,
    Avatar,
    Divider,
    Icon,
    IconButton,
} from "@chakra-ui/react";
import { ThunderboltOutlined, ThunderboltFilled } from "@ant-design/icons";
import { HiShoppingBag } from "react-icons/hi";
import { useState } from "react";
import { sendToken } from "../../lib/tokenContract";
import { nearStore } from "../../stores/near";
import { Layout } from "antd";
import PurpleButton from "../UI/PurpleButton";

const { Header, Footer, Content } = Layout;

function Post({ nft }) {
    const metadata = nft?.metadata;
    const tokenId = nft?.token_id;
    const postBg = useColorModeValue("#edf2f7", "#171923");
    const { isOpen, onOpen, onClose } = useDisclosure();

    function getCharge() {
        return [10, 20, 30, 40][Math.floor(Math.random() * 4)];
    }

    const styles = {
        // fontFamily: "poppings",
        backgroundColor: postBg,
        // maxHeight: 430,
        borderRadius: 10,
        padding: 20,
        marginTop: 20,
        marginBottom: 20,
        header: {
            height: 64,
            display: "flex",
            alignItems: "center",
            position: "relative",
            gap: 5,
        },
        content: { margin: "0 auto" },
        footer: { 
            height: 64, 
            display: "flex", 
            alignItems: "center" 
        },
    };

    const [charge, setCharge] = useState()


    useEffect(() => {
        function getCharge(tokenId) {
            // call contract and get charge
            const eleven = 111
            return eleven
        }

        setCharge(getCharge(el.token_id))

    }, [isOpen])

    return (
        <>
            <Layout style={styles}>
                <Header style={styles.header} >
                    <Avatar
                        name={nft?.owner_id}
                        src={metadata?.media || "https://bit.ly/dan-abramov"}
                        size="sm"
                    />
                    <Text my={2}>{nft?.owner_id || "pavel dantsev"}</Text>
                    <Text className="opacity-50">
                        {metadata?.issued_at || "2h ago"}
                    </Text>
                    <PurpleButton
                        className="right-0 text-white"
                        leftIcon={<HiShoppingBag />}
                    >
                        64 AE
                    </PurpleButton>
                </Header>
                <Content style={styles.content}>
                    <Box mb={1}>
                        {metadata?.media && (
                            <ChakraImage
                                maxH={250}
                                rounded="lg"
                                maxWidth={["100%", "400px", "225px"]}
                                margin="0 auto"
                                src={metadata?.media}
                                alt={"contentNftmedia" + tokenId}
                                objectFit="cover"
                            />
                        )}
                    </Box>
                    <Box p={2}>{metadata?.description}</Box>
                </Content>
                <Divider />
                <Footer
                    style={styles.footer}
                    className="flex align-middle gap-2"
                >
                    <Box onClick={onOpen}>
                        <IconButton
                            as={ThunderboltOutlined}
                            isRound
                            color="yellow"
                            variant="ghost"
                        />{" "}
                        {getCharge()}
                    </Box>
                </Footer>
            </Layout>

            <ChargeModal nft={nft} state={[isOpen, onClose]} />
        </>
    );
}

const ChargeModal = ({ nft, state }) => {
    const [isOpen, onClose] = state;
    const nearState = nearStore((state) => state);
    const sliderTrack = useColorModeValue("yellow.400", "yellow.400");
    const sliderTrackBg = useColorModeValue("yellow.100", "yellow.100");
    const sliderThumbColor = useColorModeValue("gray.900", "gray.900");
    const [sliderValue, setSliderValue] = useState(0);
    const profileState = profileStore((state) => state);
    function updateSlider(e) {
        setSliderValue(e);
    }
    async function sendMoney(amount = 0.5) {
        await sendToken(
            nearState, // state
            nft.owner_id, // reciever Id
            amount, // amount in ae
            `like from ${nearState?.accountId}`, // memo
        );
        onClose();
    }
    return (
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
                    <Box className="py-2 flex pr-2">
                        <Box className="mr-4 text-2xl">
                            <Icon as={ThunderboltFilled} color="yellow" />
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
    );
};

export default Post;
