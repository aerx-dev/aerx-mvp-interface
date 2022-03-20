import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { ChakraProvider } from "@chakra-ui/react";
import { initNearConnection, initIfps } from "../lib/auth";
import { nearStore } from "../stores/near.js";
import { profileStore } from "../stores/profile.js";
import { useEffect, useState } from "react";
import theme from "../lib/theme.js";
import "../components/Landing/slider.css";
<<<<<<< HEAD
import { contractFullAccessKey } from "../lib/contractCall";
=======
import { create } from "ipfs-core";
import { useToast } from "@chakra-ui/react";
import { useSessionStorage } from "beautiful-react-hooks"


>>>>>>> feedNFT

function MyApp({ Component, pageProps }) {
    const state = nearStore((state) => state);
    const profileState = profileStore((state) => state);
    const [isLoading, setIsLoading] = useState(true);

    const [ipfsIsOnline, setIpfsIsOnline] = useSessionStorage("ipfsIsOnline", false);
    const toast = useToast();

    useEffect(() => {
        if (!ipfsIsOnline) {
            toast({
                id: "ipfs1",
                status: "info",
                duration: 3000,
                description: "Starting IPFS node...",
            });
            var nodeIsOnline;
            if (window.ipfs) {
                nodeIsOnline = window.ipfs.isOnline();
            }
            else {
                nodeIsOnline = initIfps()
            }
            setIpfsIsOnline(nodeIsOnline)
            console.log("IFPS node is online: ", nodeIsOnline);
            toast({
                id: "ipfs2",
                status: "success",
                duration: 3000,
                description: "IPFS node is online!",
            });
        }
    }, [ipfsIsOnline])


    useEffect(() => {
        if (isLoading) {
            setIpfsIsOnline(false)
            initNearConnection(state, profileState);
            setIsLoading(false);
<<<<<<< HEAD
            console.log(state.feed);
=======
            toast({
                id: "loading",
                status: "success",
                duration: 3000,
                description: "NEAR account loaded!",
                variant: "solid",
            });
>>>>>>> feedNFT
        }
        console.log("Init Profile", profileState.profile);
    }, [isLoading, state]);

    useEffect(() => {
        (async () => {
            const contentNFTContract = await contractFullAccessKey(
                "contentNft",
            );
            const responseFeed = await contentNFTContract.nft_tokens({});
            console.log("useffect code runs");
            console.log(responseFeed);
            if (responseFeed) {
                state.setFeed(responseFeed);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    return (
        <ChakraProvider theme={theme}>
            <ThemeProvider attribute="class">
                <Component {...pageProps} />
            </ThemeProvider>
        </ChakraProvider>
    );
}

export default MyApp;
