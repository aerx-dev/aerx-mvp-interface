import { Box, useColorModeValue, useDisclosure, Image as ChakraImage, Text, Avatar, Divider} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { nearStore } from "../../stores/near";
import { Layout } from "antd";
import PostHeader from "./postHeader";
import ChargeModal from "./chargeModal";
import InteractionBar from "./interactionBar";
import SongCard from "../Player/songCard";

const { Header, Footer, Content } = Layout;

function Post({ nft, charge}) {

    const metadata = nft.metadata;
    const extra = JSON.parse(nft.metadata?.extra) || null;
    const tokenId = nft.token_id;
    const postBg = useColorModeValue("#edf2f7", "#1E2021");
    const nearState = nearStore((state) => state);
    const { isOpen, onOpen, onClose } = useDisclosure();    

    const styles = {
        fontFamily: "Open Sans",
        backgroundColor: postBg,
        position: "relative",
        borderRadius: 5,
        padding: 20,
        marginTop: 10,
        marginBottom: 10,
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
            var res = await nearState.pnftContract.get_charge({
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
                <PostHeader metadata={metadata} isUserMsg={isUserMsg} nft={nft} />
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

