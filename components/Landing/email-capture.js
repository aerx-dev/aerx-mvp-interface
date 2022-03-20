import {
    Box,
    Text,
    Input,
    Icon,
    IconButton,
    Grid,
    useColorMode,
} from "@chakra-ui/react";

import useTranslation from "next-translate/useTranslation";
import { useState } from "react";

function EmailCapture({ rest }) {
    const { t } = useTranslation("landing");
    const [email, setEmail] = useState("");
    const [state, setState] = useState("IDLE");
    const { colorMode } = useColorMode();

    async function subscribe(e) {
        e.preventDefault();

        setState("LOADING");
        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                body: JSON.stringify({ email: email }),
            });

            const { success, message } = await res.json();

            setState({ success, message });
            setEmail("");
            // if (!success) {
            //     throw new Error(message);
            // }
        } catch (error) {
            console.log("Something went wrong");
        }
    }

    return (
        <Box w="37vw">
            <Text textAlign={"left"}>{t("emailCapture.title")}</Text>

            <Grid
                margin="0 auto"
                py={5}
                textAlign="left"
                as="form"
                onSubmit={subscribe}
                {...rest}
            >
                <Input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder={t("emailCapture.placeholder")}
                    borderRadius={20}
                    filter={colorMode === "light" ? "invert(1)" : "invert(0)"}
                    position="relative"
                    p={5}
                />
                <IconButton
                    _hover={{ bg: "none" }}
                    _active={{ bg: "none" }}
                    isRound
                    position="absolute"
                    justifySelf="flex-end"
                    icon={<Icon />}
                ></IconButton>
            </Grid>
        </Box>
    );
}

export default EmailCapture;
