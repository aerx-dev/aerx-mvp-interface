import { Layout } from "antd";
import { useState, useRef, useEffect, ChangeEvent } from "react";
import { Box, Input, useColorModeValue } from "@chakra-ui/react";
import {
    AddIconButton,
    ChargeOutlineButton,
    CommentIconButton,
    ShareIconButton,
    ChargeButton,
} from "../UI/IconButton";
import useCustomToast from "../../hooks/useCustomToast";
import MemberTag from "./tagmembers";
import { nearStore } from "../../stores/near";
import CommentHeader from "./commentHeader";
import { getBalance, fetchpostsData } from "../../lib/tokenContract";
import useLongPress from "./useLongPress";

const { Header, Footer, Content } = Layout;

export type InteractionBarProps = {
    nft: any;
    onOpen: any;
    currentCharge: any;
    currentComment: any;
    onShare: () => void;
};

const InteractionBar = ({
    nft,
    onOpen,
    currentCharge,
    currentComment,
    onShare
}: InteractionBarProps) => {
    const bdcolorchanger = useColorModeValue("white", "#1B1D1E");
    const nearState = nearStore((state) => state);
    const toast = useCustomToast();
    const commentFeed = nft.comments.reverse();
    const ref = useRef<HTMLInputElement>(null);
    const [commentbody, setCommentbody] = useState({
        text: "",
        media_type: "text",
    });
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

    function commentUpdate(e: ChangeEvent<HTMLInputElement>) {
        const path = e.currentTarget.dataset.path;
        const val = e.currentTarget.value;
        setCommentbody((prevCommentbody) => {
            return {
                ...prevCommentbody,
                [path!]: val, // Might cause issue as `dataset.path` could not exist
            };
        });
    }

    async function createComment() {
        if (!nearState.pnftContract || !ref.current) {
            // TODO: do something
            return;
        }

        if (!commentbody.text) {
            toast("warning", "Comment cannot be empty!", "feedpage");
            return;
        }

        console.log(commentbody);
        try {
            const minted_comment = await nearState.pnftContract.comment(
                {
                    commenter_id: nearState.accountId,
                    comment: String(commentbody.text),
                    post_id: parseInt(nft.post_id),
                },
                "300000000000000", // attached GAS
            );
            toast("success", "Comment posted", "CNFTpost");
            await fetchpostsData(nearState);
            await getBalance(nearState);
            ref.current.value = "";
            setCommentbody({
                text: "",
                media_type: "text",
            });
        } catch (e: any) {
            console.log("Comment could not be minted! Error: " + e.message);
            toast(
                "error",
                "Comment could not be minted! Error: " + e.message,
                "CNFTerror",
            );
        }
    }

    async function clickchargePost() {
        if (nearState?.aexBalance == 0 || !nearState.pnftContract) {
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
            toast(
                "success",
                "Charge Successfull 1 aex token sent!",
                "ChargeIdSucc",
            );
            await fetchpostsData(nearState);
            await getBalance(nearState);
        }
    }
    console.log("commentfeed", commentFeed);
    console.log("test", Number.isInteger(parseInt(nft?.post_id)));
    console.log("test3", parseFloat(currentCharge));

    return (
        <>
            {nft.owner_id == "Aerx.testnet" ||
            Number.isInteger(parseInt(nft?.post_id)) == false ? null : (
                <>
                    <Footer
                        style={styles.footer}
                        className="flex align-middle gap-2"
                    >
                        {nft?.owner_id == nearState?.accountId ? (
                            <>
                                {parseFloat(currentCharge) == 0 ? (
                                    <ChargeOutlineButton />
                                ) : (
                                    <ChargeButton />
                                )}
                            </>
                        ) : (
                            <>
                                {parseFloat(currentCharge) == 0 ? (
                                    <ChargeOutlineButton {...longPressEvent} />
                                ) : (
                                    <ChargeButton {...longPressEvent} />
                                )}
                            </>
                        )}
                        {currentCharge}
                        <CommentIconButton onClick={comment} />
                        {currentComment}
                        <ShareIconButton opacity={0.7} ml={2} onClick={onShare}/>0
                        <MemberTag style={styles.tag} />
                    </Footer>
                    <Footer>
                        {commentBox ? (
                            <Box
                                flexDirection="row"
                                display="flex"
                                alignItems="center"
                            >
                                <Input
                                    onChange={commentUpdate}
                                    maxLength={500}
                                    type="text"
                                    data-path="text"
                                    placeholder="comment"
                                    borderRadius={20}
                                    size="sm"
                                    ref={ref}
                                    border="none"
                                    bg={bdcolorchanger}
                                />
                                <Box onClick={createComment}>
                                    <AddIconButton />
                                </Box>
                            </Box>
                        ) : null}
                    </Footer>
                </>
            )}
        </>
    );
};

export default InteractionBar;
