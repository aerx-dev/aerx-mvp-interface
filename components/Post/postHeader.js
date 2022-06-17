import TimeAgo from "timeago-react";
import { PurpleButton } from "../UI/Buttons";
import { Layout } from "antd";
import { nearStore } from "../../stores/near";
import { Box, Text, Avatar } from "@chakra-ui/react";

const { Header, Footer, Content } = Layout;

const PostHeader = ({metadata, isUserMsg, currentProfile, nft}) => {

    const styles = {
        header: {
            height: 64,
            display: "flex",
            alignItems: "center",
            position: "relative",
            gap: 5,
        }
    };
    const pft ={currentProfile};
    console.log('hbh',pft.currentProfile.metadata.media);
    
    const nearState = nearStore((state) => state);

    return (
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
    )
}

export default PostHeader;
