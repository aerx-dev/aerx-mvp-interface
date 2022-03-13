import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Avatar,
    Box,
    Button,
    CloseButton,
    colorMode,
    IconButton,
    Input,
    useColorModeValue,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import { useState, createElement } from "react";
import { profileStore } from "../../stores/profile";
import { getBalance, issueTokens } from "../../lib/tokenContract";
import useTranslation from "next-translate/useTranslation";

function NewPost({ state, bg }) {
    const profileState = profileStore((state) => state);

    const [body, setBody] = useState("");
    const [postError, setPostError] = useState("");
    const { t } = useTranslation("profile");

    const filter = colorMode === "light" ? "invert(1)" : "invert(0)";

    const imgIconEl = createElement("img", {
        src: "/icons/image.png",
        alt: "upload image",
    });
    const musicIconEl = createElement("img", {
        src: "/icons/music.png",
        alt: "upload music",
    });

    async function createPost() {
        if (body.length < 1) {
            setPostError("Post cannot be blank.");
            return;
        }

        let b = await getBalance(state);
        if (b == 0) {
            console.log("0 posts");
            await issueTokens(state.accountId);
        }
    }

    return (
        <Box
            flexDirection="row"
            display="flex"
            alignItems="center"
            bg={bg}
            px={4}
            py={2}
            borderRadius={10}
        >
            <Avatar
                size="xs"
                name={profileState.profile?.fullName}
                src={profileState.profile?.profileImage}
                mr={3}
            />

            <Input
                onChange={(e) => {
                    setPostError("");
                    setBody(e.currentTarget.value);
                }}
                maxLength={500}
                type="text"
                placeholder={t("new")}
                borderRadius={20}
                filter={filter}
                size="sm"
                border="none"
                bg={useColorModeValue("white", "gray.800")}
            />

            <IconButton
                aria-label="Search"
                isRound
                size="xs"
                variant="ghost"
                icon={musicIconEl}
                ml={3}
                opacity={0.5}
                bg={useColorModeValue("#6054F0", "gray.900")}
            />
            <IconButton
                aria-label="Search"
                isRound
                size="xs"
                variant="ghost"
                icon={imgIconEl}
                ml={2}
                opacity={0.5}
                bg={useColorModeValue("#6054F0", "gray.900")}
            />
            <IconButton
                type="submit"
                aria-label="Search"
                isRound
                size="xs"
                icon={<AddIcon />}
                ml={5}
                onClick={createPost}
                bgColor="#6054F0"
                color="white"
            />

            {postError && (
                <Alert status="error">
                    <AlertIcon />
                    <AlertTitle mr={2}>Error!</AlertTitle>
                    <AlertDescription>{postError}</AlertDescription>
                    <CloseButton
                        position="absolute"
                        right="8px"
                        top="8px"
                        onClick={() => setPostError("")}
                    />
                </Alert>
            )}
        </Box>
    );
}

export default NewPost;
