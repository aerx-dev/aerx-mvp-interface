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
    Input
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { ThunderboltOutlined, ThunderboltFilled } from "@ant-design/icons";
import { IoChatbubbleOutline } from "react-icons/io5";
import { FiNavigation } from "react-icons/fi";
import { HiShoppingBag } from "react-icons/hi";
import { useState, useEffect } from "react";
import { nearStore } from "../../stores/near";
import { Layout } from "antd";
import PurpleButton from "../UI/PurpleButton";
import useCustomToast from "../../hooks/useCustomToast";
import TimeAgo from "timeago-react";
import SongCard from "../Player/songCard";

const { Header, Footer, Content } = Layout;

function Post({ nft, charge}) {

    const metadata = nft.metadata;
    const extra = JSON.parse(nft.metadata?.extra) || null;
    const tokenId = nft.token_id;
    const postBg = useColorModeValue("#edf2f7", "#1E2021");
    const iconColor = useColorModeValue("gray.400", "white")
    const nearState = nearStore((state) => state);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const fill = useColorModeValue("gray", "white");
    const [ commentBox , setCommentBox ] = useState(false);
    const comment = () =>{
        setCommentBox(!commentBox)
    }

    const styles = {
        fontFamily: "Open Sans",
        backgroundColor: postBg,
        // maxHeight: 430,
        borderRadius: 10,
        padding: 20,
        marginTop: 10,
        marginBottom: 10,
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

    const [currentCharge, setCurrentCharge] = useState();
    useEffect(() => {
        async function getCharge() {
            var res = await nearState.cnftContract.get_charge({
                token_id: nft.token_id.toString(),
            });

            setCurrentCharge(res);
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
                        bg="gray.400"
                        name={nft?.owner_id}
                        src={
                            isUserMsg
                                ? nearState.profile?.profileImg
                                : metadata?.media ||
                                  nft?.owner_id || // extra connditions for display data
                                  "https://bit.ly/dan-abramov"
                        }
                        size="md"
                    />
                    <Text my={2} ml={2}>{nft?.owner_id || "Pavel dantsev"}</Text>
                    <TimeAgo
                        className={`text-[11px] ${
                            isUserMsg && "order-last pr-1"
                        } opacity-60`}
                        datetime={metadata.issued_at}
                    />
                    <PurpleButton
                        className="right-0 text-white"
                        leftIcon={<HiShoppingBag />}
                    >
                        64 æ
                    </PurpleButton>
                </Header>
                <Content style={styles.content}>
                    {extra?.media_type === "audio" ||
                    extra?.type === "audio" ? (
                        <SongCard
                            url={metadata?.media}
                            artist={extra?.artist}
                            title={extra?.title}
                            duration={extra?.duration}
                            cover={extra?.cover}
                        />
                    ) : (
                        <Box mb={1}>
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
                        </Box>
                    )}
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
                    <Box onClick={comment}>
                        <IconButton
                            color = {iconColor}
                            variant="ghost"
                            size="lg"
                            icon={<IoChatbubbleOutline />}
                            isRound  
                        />
                    </Box>
                    <Box>
                        <IconButton
                aria-label="add-image"
                isRound
                size="xs"
                variant="ghost"
                icon={
                    <Icon
                        width="19"
                        height="19"
                        viewBox="0 0 20 20"
                        fill="none"
                    >
                        <path d="M17.3325 7.77194L17.7568 8.1962L18.181 7.77194L17.7568 7.34768L17.3325 7.77194ZM3.6 16.8246C3.6 12.1563 7.38438 8.37193 12.0527 8.37193V7.17193C6.72164 7.17193 2.4 11.4936 2.4 16.8246H3.6ZM12.0527 8.37193H17.3334V7.17193H12.0527V8.37193ZM13.9848 11.9681L17.7568 8.1962L16.9082 7.34768L13.1363 11.1196L13.9848 11.9681ZM17.7568 7.34768L13.9848 3.57574L13.1363 4.42426L16.9082 8.1962L17.7568 7.34768Z" fill={useColorModeValue("gray", "white")} fill-opacity="0.5"/>
                    </Icon>
                }
                ml={2}
                opacity={0.7}
            ></IconButton>
                    </Box>
                </Footer>
                <Footer>
                    { commentBox ? 
                        <Box 
                            flexDirection="row"
                            display="flex"
                            alignItems="center">
                                <Input
                                    maxLength={500}
                                    type="text"
                                    data-path="text"
                                    placeholder="comment"
                                    borderRadius={20}
                                    size="sm"
                                    border="none"
                                    bg={useColorModeValue("white", "#1B1D1E")}
                                />
                            
                            <Box>
                                <IconButton
                                    type="submit"
                                    aria-label="post"
                                    isRound
                                    size="xs"
                                    icon={<AddIcon />}
                                    ml={2}
                                    bgColor="#6054F0"
                                    color="white"
                                /> 
                            </Box>
                        </Box> : null}
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
        const { data, error } = await supabase
            .from("postnft")
            .select("id, totalCharged")
            .eq("id", _tokenId);
        console.log("data received from supabase", data);
        const newTotalCharge = data.totalCharged + _charge;
        // Update the post total charge on the db before setting the charge
        // on page reload
        setCharge(_tokenId, newTotalCharge);

        if (error) {
            toast(
                "error",
                "Post could not be fetched from Supabase! Error: " +
                    error.message,
                "supaErr",
            );
            throw error;
        } else {
            console.log(" post successfully updated to Supabase"),
                "supaSuccess";
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
            });
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

