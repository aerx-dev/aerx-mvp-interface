import { Box, useColorModeValue, useDisclosure, Image as ChakraImage, Text, Avatar, Divider} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { nearStore } from "../../stores/near";
import { Layout } from "antd";
import SearchHeader from "./searchHeader";

const { Header, Footer, Content } = Layout;

function Searchpost({ nft, charge}) {

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


    const isUserMsg = nft.owner_id === nearState.accountId ? true : false;
    
    const [currentProfile, setCurrentProfile] = useState();
    useEffect(() => {
        async function get_current_profile() {
            if(nft.owner_id === nearState.accountId || nft.owner_id ===  "Aerx.testnet" ){
                return
            } else {
            var res = await nearState.pnftContract.profile_by_id({
                user_id: nearState.accountId,
                user_to_find_id: nft.owner_id,
            });

            setCurrentProfile(res);
            // return res;
            }
        }
        get_current_profile();
    }, [nearState, nearState.accountId, nft.owner_id, isOpen]);

    return (
        <>
            <Layout style={styles}>
                <SearchHeader metadata={metadata} currentProfile={currentProfile} isUserMsg={isUserMsg} nft={nft} />
            </Layout>
        </>
    );
}

export default Searchpost;

