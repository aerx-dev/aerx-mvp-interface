import TimeAgo from "timeago-react";
import { Layout } from "antd";
import { nearStore } from "../../stores/near";
import { Box, Text, Avatar, Link } from "@chakra-ui/react";
import NextLink from "next/link";
const { Header, Footer, Content } = Layout;

const CommentHeader = ({ commentFeed, currentCommentProfile }) => {

    const styles = {
        header: {
            height: 64,
            display: "flex",
            alignItems: "center",
            position: "relative",
            gap: 5,
        }
    };
    
    //console.log('hbh',{currentProfile}.currentProfile?.metadata.media);
    /*src={
                    isUserMsg
                        ? nearState.profile?.profileImg
                        : metadata?.media ||{currentProfile}.currentProfile?.metadata?.media
                } */
    const nearState = nearStore((state) => state);

    return (
        <Footer style={styles.header}>
            <Avatar
                className=" bg-slate-300"
                bg="gray.400"
                name={commentfeed?.owner_id}
                
                size="md"
            />
            <Box ml={2}>
                <Text>{' '}<NextLink href={`/profile/${encodeURIComponent(commentfeed?.owner_id)}`} passHref><Link>{commentfeed?.owner_id}</Link></NextLink>{' '}</Text>
            </Box>
            
        </Footer>
    )
}

export default CommentHeader;
