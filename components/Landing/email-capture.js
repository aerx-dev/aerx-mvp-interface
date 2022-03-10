import Image from "next/image";
import {
    Heading,
    Box,
    Button,
    Input,
    Grid,
    useColorMode,
    Image as ChakraImage,
    useColorModeValue,
} from "@chakra-ui/react";

import useTranslation from "next-translate/useTranslation";
import { useState } from "react";

function EmailCapture({ rest }) {
    const { t } = useTranslation("landing");
    const [email, setEmail] = useState("");
    const [state, setState] = useState("IDLE");
    const { colorMode } = useColorMode();
    const bg = useColorModeValue("white", "gray.800");

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
        <Box as="section" py={100}>
            <Box position="relative">
                <ChakraImage
                    zIndex={-1}
                    src="/grid.png"
                    filter={colorMode === "light" ? "invert(1)" : "invert(0)"}
                    width={400}
                    position="absolute"
                    top={-20}
                    right={"30%"}
                />
            </Box>

            <Heading textAlign={"center"} mb={8}>
                {t("emailCapture.title")}
            </Heading>

            <Box textAlign="center" bg={bg}>
                <Grid
                    templateColumns={[
                        "repeat(100%)",
                        "calc(100% - 150px) 140px",
                    ]}
                    gap="8px"
                    maxWidth={600}
                    margin="0 auto"
                    as="form"
                    onSubmit={subscribe}
                    {...rest}
                >
                    <Input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder={t("emailCapture.placeholder")}
                    />
                    <Button
                        variant="outline"
                        _hover={{ bg: "none" }}
                        _active={{ bg: "none" }}
                        width="100%"
                    >
                        {t("emailCapture.buttonText")}
                    </Button>
                </Grid>
            </Box>
        </Box>
    );
}

export default EmailCapture;
