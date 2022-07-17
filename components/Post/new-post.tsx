import {
    Avatar,
    Box,
    Input,
    useColorMode,
    useColorModeValue,
} from "@chakra-ui/react";
import useCustomToast from "../../hooks/useCustomToast";
import {
    AddAudioIcon,
    AddIconButton,
    AddImageIcon,
    RepeatIconButton,
} from "../UI/IconButton";
import usePinata from "../../hooks/usePinata";
import { useState, useEffect, useRef } from "react";
import { nearStore } from "../../stores/near";
import { getBalance, fetchpostsData } from "../../lib/tokenContract";
import useTranslation from "next-translate/useTranslation";
import useFetchPosts from "../../hooks/useFetchPosts";

function NewPost({ bg }: { bg: string }) {
    const nearState = nearStore((state) => state);
    // const [balance, setBalance] = useState(0);
    const refresh = useFetchPosts();
    const toast = useCustomToast();

    // The uploaded image which will be deployed through IPFS
    const [uploadFile, setUploadFile] = useState<File>();
    console.log("uploadFile : ", uploadFile);

    // Ipsf hook with details and upload hook.
    const ipfsData = usePinata(uploadFile, toast);
    const ref = useRef<HTMLInputElement>(null);

    const [body, setBody] = useState({
        text: "",
        media_type: "text",
    });

    const { t } = useTranslation("profile");
    const { colorMode } = useColorMode();
    const filter = colorMode === "light" ? "invert(0)" : "invert(0)";
    const fill = useColorModeValue("gray", "white");

    useEffect(() => {
        (async () => {
            if (nearState.tokenContract) {
                let { formatted }: any = await getBalance(nearState);
                await fetchpostsData(nearState);
                toast(
                    "info",
                    "Your balance is " + formatted + " AEX$",
                    "BalanceId",
                );
            }
        })(); // IIFE
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function createPost() {
        if (!nearState.pnftContract) {
            // TODO: do something here (maybe toast alert?)
            return;
        }
        if (!body.text || !ref.current) {
            toast("warning", "Post cannot be empty!", "feedpage");
            return;
        }

        let postToSave = {
            title: "AERX PostNFT for " + nearState.accountId,
            description: body.text,
            media: ipfsData.fileUrl,
            media_hash: ipfsData.urlSha256,
            issued_at: new Date().toISOString(),
            extra: JSON.stringify(body),
        };
        console.log("Type of post to save: ", typeof postToSave);
        console.log(body);
        console.log("Post to save: ", postToSave);
        try {
            const minted_post = await nearState.pnftContract.mint_post(
                {
                    user_id: nearState.accountId,
                    origin_post_id: 0,
                    token_metadata: postToSave,
                },
                "300000000000000", // attached GAS
            );
            console.log("just minted", minted_post);
            toast(
                "success",
                "AERX ContentNFT with id : " +
                // minted_post.post_id +
                "was minted successfully!",
                "CNFTsccss",
            );

            await getBalance(nearState);
            await fetchpostsData(nearState);
            ref.current.value = "";
            setBody({
                text: "",
                media_type: "text",
            });
        } catch (e: any) {
            console.log("Post could not be minted! Error: " + e.message);
            toast(
                "error",
                "Post could not be minted! Error: " + e.message,
                "CNFTerror",
            );
        }
    }

    // Reffs to the content data
    const inputAudio = useRef<HTMLInputElement>(null);
    const onAudioClick = () => {
        inputAudio.current && inputAudio.current.click();
        setBody((prevBody: any) => {
            return {
                ...prevBody,
                type: "audio",
            };
        });
    };

    const inputImg = useRef<HTMLInputElement>(null);
    const onImgClick = () => {
        inputImg.current && inputImg.current.click();
        setBody((prevBody: any) => {
            return {
                ...prevBody,
                type: "image",
            };
        });
    };
    function fileChange(event: any) {
        const { files } = event.target;
        if (files) {
            // // TODO check what type it is
            const filename = files[0].name;
            var parts = filename.split(".");
            const fileType = parts[parts.length - 1];
            setBody((prevBody: any) => {
                return {
                    ...prevBody,
                    media_extension: fileType,
                };
            });
            console.log(body);
            setUploadFile(() => event.target.files[0]);
        }
    }

    function update(e: any) {
        const path = e.currentTarget.dataset.path;
        const val = e.currentTarget.value;
        setBody((prevBody: any) => {
            return {
                ...prevBody,
                [path]: val,
            };
        });
    }

    return (
        <Box
            flexDirection="row"
            display="flex"
            alignItems="center"
            bg={bg}
            px={4}
            py={2}
            borderRadius={5}
            className="sticky top-20 z-10 shadow-lg"
            w={"100%"}
        >
            <Avatar
                size="xs"
                name={nearState.profile?.fullName}
                src={nearState.profile?.profileImg}
                mr={3}
            />

            <Input
                onChange={update}
                maxLength={500}
                type="text"
                data-path="text"
                placeholder={t("new")}
                borderRadius={20}
                filter={filter}
                ref={ref}
                size="sm"
                border="none"
                bg={useColorModeValue("white", "#1B1D1E")}
            />

            <Box onClick={onAudioClick} ml={3}>
                <AddAudioIcon />
            </Box>
            <Box onClick={onImgClick} ml={2} opacity={0.7}>
                <AddImageIcon />
            </Box>
            <Box display="none">
                <input ref={inputAudio} onChange={fileChange} type="file" />
            </Box>
            <Box display="none">
                <input ref={inputImg} onChange={fileChange} type="file" />
            </Box>
            <Box onClick={createPost} ml={3}>
                <AddIconButton />
            </Box>
        </Box>
    );
}

export default NewPost;
