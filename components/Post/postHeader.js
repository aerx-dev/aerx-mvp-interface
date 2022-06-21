import TimeAgo from "timeago-react";
import { PurpleButton } from "../UI/Buttons";
import { Layout } from "antd";
import { nearStore } from "../../stores/near";
import { Box, Text, Avatar, Link } from "@chakra-ui/react";
import NextLink from "next/link";
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
    
    console.log('hbh',{currentProfile}.currentProfile?.metadata.media);
    
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
                        : metadata?.media ||{currentProfile}.currentProfile?.metadata?.media
                }
                size="md"
            />
            <Box ml={2}>
                <Text>{' '}<NextLink href={`/profile/${encodeURIComponent(nft?.owner_id)}`} passHref><Link>{nft?.owner_id}</Link></NextLink>{' '}</Text>
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
