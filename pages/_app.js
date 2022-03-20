import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { ChakraProvider } from "@chakra-ui/react";
import { initNearConnection } from "../lib/auth";
import { nearStore } from "../stores/near.js";
import { useEffect, useState } from "react";
import theme from "../lib/theme.js";
import "../components/Landing/slider.css";
import { contractFullAccessKey } from "../lib/contractCall";

function MyApp({ Component, pageProps }) {
    const state = nearStore((state) => state);
    // const profileState = profileStore((state) => state);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            initNearConnection(state);
            setIsLoading(false);
        }
    }, [isLoading, state]);

    useEffect(() => {
        (async () => {
            const contentNFTContract = await contractFullAccessKey(
                "contentNft",
            );
            const responseFeed = await contentNFTContract.nft_tokens({});
            console.log(state.profile);
            if (responseFeed) {
                state.setFeed(responseFeed);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ChakraProvider theme={theme}>
            <ThemeProvider attribute="class">
                <Component {...pageProps} />
            </ThemeProvider>
        </ChakraProvider>
    );
}

export default MyApp;
