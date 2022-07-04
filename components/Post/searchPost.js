import {
    Box,
    useColorModeValue,
    useDisclosure,
    Image as ChakraImage,
    Text,
    Avatar,
    Divider,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { nearStore } from "../../stores/near";
import { Layout } from "antd";
import SearchHeader from "./searchHeader";

const { Header, Footer, Content } = Layout;

function Searchpost({ nft, charge }) {
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

    const isUserMsg = nft === nearState.accountId ? true : false;

    const [currentProfile, setCurrentProfile] = useState();
    useEffect(() => {
        async function get_current_profile() {
            var res = await nearState.pnftContract?.profile_by_id({
                user_id: nearState.accountId,
                user_to_find_id: nft,
            });

            setCurrentProfile(res);
            // return res;
        }
        get_current_profile();
    }, [nearState, nearState.accountId, nft, isOpen]);

    return (
        <>
            <Layout style={styles}>
                <SearchHeader
                    currentProfile={currentProfile}
                    isUserMsg={isUserMsg}
                    nft={nft}
                />
            </Layout>
        </>
    );
}

export default Searchpost;
