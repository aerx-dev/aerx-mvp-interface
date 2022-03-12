import Image from "next/image";
import {
    Heading,
    Box,
    Button,
    Text,
    Input,
    Grid,
    useColorMode,
    Image as ChakraImage,
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
            if (!success) {
                throw new Error(message);
            }
        } catch (error) {
            console.log("Something went wrong");
        }
    }

    return (
        <Box>
            <Text textAlign={"left"} mb={5}>
                {t("emailCapture.title")}
            </Text>

            <Box textAlign="left" mb={5}>
                <Grid
                    templateColumns={[
                        "repeat(100%)",
                        "calc(100% - 150px) 140px",
                    ]}
                    margin="0 auto"
                    as="form"
                    onSubmit={subscribe}
                    {...rest}
                >
                    <Input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder={t("emailCapture.placeholder")}
                        borderRadius={20}
                        filter={
                            colorMode === "light" ? "invert(1)" : "invert(0)"
                        }
                    />
                    {/* <Button
                        variant="outline"
                        _hover={{ bg: "none" }}
                        _active={{ bg: "none" }}
                        width="100%"
                    ></Button> */}
                </Grid>
            </Box>
        </Box>
    );
}

export default EmailCapture;
