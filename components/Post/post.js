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
import { useState, useEffect } from "react";
import { nearStore } from "../../stores/near";
import { Layout } from "antd";
import PurpleButton from "../UI/PurpleButton";
import useCustomToast from "../../hooks/useCustomToast";
import TimeAgo from "timeago-react";
import SongCard from "../Player/songCard";


const { Header, Footer, Content } = Layout;

function Post({ nft, posts, charge }) {

    const allPosts = posts;
    console.log({allPosts: allPosts})

    const metadata = nft.metadata;
    const extra = JSON.parse(nft.metadata?.extra) || null;
    const tokenId = nft.token_id;
    const postBg = useColorModeValue("#edf2f7", "#171923");
    const nearState = nearStore((state) => state);
    const { isOpen, onOpen, onClose } = useDisclosure();

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
        // ! prevent too long to read contents from spanning large heights
        // instead turn to scrollable content container
        content: {
            margin: "0 auto",
            overflowY: "auto",
            maxH: 400,
            overflowX: "hidden",
        },
        footer: {
            height: 64,
            display: "flex",
            alignItems: "center",
        },
    };

    const [currentCharge, setCurrentCharge] = useState()
    useEffect(() => {
        async function getCharge() {
            var res = await nearState.cnftContract
                .get_charge({ token_id: nft.token_id.toString() })

            setCurrentCharge(res)
            // return res;
        }
        getCharge();
    }, [nearState, nft.token_id, isOpen]);


    const isUserMsg = nft.owner_id === nearState.accountId ? true : false;

    return (
        <>
            <Layout style={styles}>
                <Header style={styles.header}>
                    <Avatar
                        className=" bg-slate-300"
                        bg={postBg}
                        name={nft?.owner_id}
                        src={
                            isUserMsg
                                ? nearState.profile?.profileImg
                                : metadata?.media ||
                                nft?.owner_id || // extra connditions for display data
                                "https://bit.ly/dan-abramov"
                        }
                        size="sm"
                    />
                    <Text my={2}>{nft?.owner_id || "pavel dantsev"}</Text>
                    <TimeAgo
                        className={`text-[11px] ${isUserMsg && "order-last pr-1"
                            } opacity-60`}
                        datetime={metadata.issued_at}
                    />
                    <PurpleButton
                        className="right-0 text-white"
                        leftIcon={<HiShoppingBag />}
                    >
                        64 AE
                    </PurpleButton>
                </Header>
                <Content style={styles.content}>
                    {(extra?.media_type === "audio" || extra?.type === "audio")
                        ? <SongCard
                            url={metadata?.media}
                            artist={extra?.artist}
                            title={extra?.title}
                            duration={extra?.duration}
                            cover={extra?.cover}
                        />
                        : <Box mb={1}>
                            {metadata?.media && (
                                <ChakraImage
                                    maxH={200}
                                    rounded="lg"
                                    maxWidth={["100%", "400px", "225px"]}
                                    margin="0 auto"
                                    src={metadata?.media}
                                    alt={"contentNftmedia" + tokenId}
                                    objectFit="contain"
                                />
                            )}
                        </Box>}
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
                        {currentCharge}
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
    const postBg = useColorModeValue("#d182ffda", "#171923");
    const toast = useCustomToast();



    function updateSlider(e) {
        setSliderValue(e);
    }

    async function getTotalCharges(_tokenId, _charge) {
        // Get the post using the tokenId from supabase
        const { data, error } = await supabase.from('postnft').select('id, totalCharged').eq('id', _tokenId)
        console.log("data received from supabase", data)
        const newTotalCharge = data.totalCharged + _charge;
        // Update the post total charge on the db before setting the charge
        // on page reload
        setCharge(_tokenId, newTotalCharge);

        if (error) {
            toast(
                "error",
                "Post could not be fetched from Supabase! Error: " + error.message, "supaErr"
            );
            throw error
        } else {
            console.log(" post successfully updated to Supabase"), "supaSuccess"
            // redirect back to feed
        }
    }

    async function setCharge(_tokenId, _charge) {
        try {
            await nearState.cnftContract.set_charge({
                token_id: _tokenId.toString(),
                charge: _charge.toString(),
            });
            toast("success", "Charged " + _charge + "AEX$", "ChargeIderr");
        } catch (e) {
            console.log("set charge failed!", e);
        }
    }

    async function chargePost() {
        const amount = 11;
        nearState.tokenContract
            .ft_transfer(
                {
                    receiver_id: nft.owner_id,
                    amount: amount.toString(),
                    memo:
                        "Charge :zap: from " +
                        nearState?.accountId +
                        " for your AEXpost id." +
                        nft.token_id,
                },
                "300000000000000", // attached GAS (optional)
                1, // attached deposit in yoctoNEAR (optional)
            )
            .catch((e) => {
                console.log("Charge failed!", e);
                toast("error", "Charge failed!", "ChargeIderr");
            })
            .then(() => getTotalCharges(nft.tokenId, amount))
        //.then(() => setCharge(nft.tokenId, newAmount));
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
            <ModalContent bg={postBg}>
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
                    <Button colorScheme="blue" onClick={chargePost}>
                        Confirm
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};


export default Post;
