import { Box, useColorModeValue, useDisclosure, Image as ChakraImage, Text, Avatar, Divider, Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { nearStore } from "../../stores/near";
import { Layout } from "antd";
import { PurpleButton } from "../UI/Buttons";
import ChargeModal from "./chargeModal";
import InteractionBar from "./interactionBar";
import TimeAgo from "timeago-react";
import SongCard from "../Player/songCard";

const { Header, Footer, Content } = Layout;

function Post({ nft, charge}) {

    const metadata = nft.metadata;
    const extra = JSON.parse(nft.metadata?.extra) || null;
    const tokenId = nft.token_id;
    const postBg = useColorModeValue("#edf2f7", "#1E2021");
    const nearState = nearStore((state) => state);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const fill = useColorModeValue("gray", "white");
    

    const styles = {
        fontFamily: "Open Sans",
        backgroundColor: postBg,
        position: "relative",
        borderRadius: 5,
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
        content: {
            margin: "0 auto",
            overflowY: "auto",
            maxH: 400,
            overflowX: "hidden",
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
                    <Box ml={2}>
                        <Text>{nft?.owner_id || "Pavel dantsev"}</Text>
                        <TimeAgo 
                            className={`text-[11px] ${
                                isUserMsg && "order-last pr-1"
                            } opacity-60`}
                            datetime={metadata.issued_at}
                        />
                    </Box>
                    <PurpleButton className="right-0 text-white">
                        64 æ
                    </PurpleButton>
                </Header>
                <Content style={styles.content}>
                    <Box p={2}>{metadata?.description}</Box>
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
                        <Box my={2}>
                            {metadata?.media && (
                                <ChakraImage
                                    maxWidth={"100%"}
                                    margin="0 auto"
                                    src={metadata?.media}
                                    alt={"contentNftmedia" + tokenId}
                                    objectFit="contain"
                                />
                            )}
                        </Box>
                    )}
                </Content>
                <Divider />
                <InteractionBar onOpen={onOpen} currentCharge={currentCharge} />
            </Layout>
            <ChargeModal nft={nft} state={[isOpen, onClose]} />
        </>
    );
}


export default Post;

