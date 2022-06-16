import { Layout } from "antd";
import { useState } from "react";
import { Box, Input, useColorModeValue } from "@chakra-ui/react";
import {
    AddIconButton,
    ChargeOutlineButton,
    CommentIconButton,
    ShareIconButton,
} from "../UI/IconButton";
import MemberTag from "./tagmembers";
import { nearStore } from "../../stores/near";
import useLongPress from "./useLongPress";

const { Header, Footer, Content } = Layout;

const InteractionBar = ({ nft, onOpen, currentCharge, currentComment }) => {
    const bdcolorchanger = useColorModeValue("white", "#1B1D1E");
    const nearState = nearStore((state) => state);
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

    const [commentBox, setCommentBox] = useState(false);
    const comment = () => {
        setCommentBox(!commentBox);
    };
    const [longPressCount, setlongPressCount] = useState(0);

    const onLongPress = () => {
        console.log("longpress is triggered");
        onOpen();
    };

    const onClick = () => {
        console.log("click is triggered");
        clickchargePost();
    };

    const defaultOptions = {
        shouldPreventDefault: true,
        delay: 500,
    };
    const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

    async function clickchargePost() {
        if (nearState?.aexBalance == 0) {
            return;
        } else {
            const amount = 1000000000000000000000000n;
            nearState.pnftContract
                .charge(
                    {
                        charger_id: nearState.accountId,
                        post_id: parseInt(nft.post_id),
                        amount: amount.toString(),
                    },
                    "300000000000000", // attached GAS (optional)
                )
                .catch((e) => {
                    console.log("Charge failed!", e);
                    console.log("nft.owner_id", nft.owner_id);
                    toast("error", "Charge failed!", "ChargeIderr");
                });
        }
    }

    return (
        <>
            <Footer style={styles.footer} className="flex align-middle gap-2">
                <ChargeOutlineButton {...longPressEvent} />
                {currentCharge}
                <CommentIconButton onClick={comment} />{currentComment}
                <ShareIconButton opacity={0.7} ml={2} />0
                <MemberTag style={styles.tag} />
            </Footer>
            <Footer>
                {commentBox ? (
                    <Box flexDirection="row" display="flex" alignItems="center">
                        <Input
                            maxLength={500}
                            type="text"
                            data-path="text"
                            placeholder="comment"
                            borderRadius={20}
                            size="sm"
                            border="none"
                            bg={bdcolorchanger}
                        />
                        <Box>
                            <AddIconButton />
                        </Box>
                    </Box>
                ) : null}
            </Footer>
        </>
    );
};

export default InteractionBar;
