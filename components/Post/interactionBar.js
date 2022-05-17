import { Layout } from "antd";
import { useState } from "react";
import { Box , Input, useColorModeValue } from "@chakra-ui/react";
import { AddIconButton, ChargeOutlineButton, CommentIconButton, ShareIconButton } from "../UI/IconButton";
import MemberTag from "./tagmembers";

const { Header, Footer, Content } = Layout;

const InteractionBar = ({onOpen, currentCharge}) => {

    const styles = {
        footer: {
            height: 64,
            display: "flex",
            alignItems: "center",
        },
        tag: {
            position: "absolute",
            right: "20px",
        },
    };

    const [ commentBox , setCommentBox ] = useState(false);
    const comment = () =>{
        setCommentBox(!commentBox)
    }

    return (
        <>
            <Footer style={styles.footer} className="flex align-middle gap-2" >
                <ChargeOutlineButton onClick={onOpen}/>{currentCharge}
                <CommentIconButton onClick={comment}/>0
                <ShareIconButton opacity={0.7} ml={2}/>0
                <MemberTag style={styles.tag}/>
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
                            <AddIconButton/>
                        </Box>
                    </Box> : null}
            </Footer>
        </>
    );
}

export default InteractionBar;