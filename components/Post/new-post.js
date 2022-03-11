import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Textarea,
    Box,
} from "@chakra-ui/react";

import { useState } from "react";
import { profileStore } from "../../stores/profile";
// import supabase, { getProfile } from "../../lib/supabase";
import { getBalance, issueTokens } from "../../lib/tokenContract";

function NewPost({ state }) {
    const profileState = profileStore((state) => state);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [body, setBody] = useState("");
    const [postError, setPostError] = useState("");

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
        // const { data, error } = await supabase
        //     .from("posts")
        //     .insert([
        //         {
        //             profileId: profileState.profile.id,
        //             body,
        //             walletId: profileState.profile.walletId,
        //         },
        //     ]);

        // if (!error && data.length) {
        //     const newProfile = await getProfile(profileState.profile.walletId);
        //     profileState.setProfile(newProfile);
        //     setBody("");
        //     onClose();
        //     window.location = window.location.href;
        // } else {
        //     console.log(error);
        //     // alert("Error creating profile");
        // }
    }

    return (
        <>
            <Button onClick={onOpen}>New Post</Button>

            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent mx={5} rounded="xl">
                    <ModalHeader>New Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Textarea
                            maxLength={200}
                            onChange={(e) => {
                                setPostError("");
                                setBody(e.currentTarget.value);
                            }}
                            mb={1}
                        />
                        {body.length} / 200
                    </ModalBody>

                    <ModalFooter>
                        <Box fontSize="sm" color="red.500">
                            {postError}
                        </Box>
                        <Button variant="ghost" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme="blue" onClick={createPost}>
                            Confirm
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default NewPost;
