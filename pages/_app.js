import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { ChakraProvider } from "@chakra-ui/react";
import { initNearConnection, initIfps, checkProfile } from "../lib/auth";
import { nearStore } from "../stores/near.js";
import { useEffect, useState } from "react";
import theme from "../lib/theme.js";
import "../components/Landing/slider.css";
import { useSessionStorage } from "beautiful-react-hooks";

function MyApp({ Component, pageProps }) {
    const [isLoading, setIsLoading] = useState(true);
    const [ipfsIsOnline, setIpfsIsOnline] = useSessionStorage(
        "ipfsIsOnline",
        false,
    );
    const nearState = nearStore((state) => state);

    // const toast = useToast();

    // useEffect(() => {
    //     if (!ipfsIsOnline) {
    //         // toast({
    //         //     id: "ipfs1",
    //         //     status: "info",
    //         //     duration: 3000,
    //         //     description: "Starting IPFS node...",
    //         // });
    //         var nodeIsOnline;
    //         if (window.ipfs) {
    //             nodeIsOnline = window.ipfs.isOnline();
    //         } else {
    //             nodeIsOnline = initIfps();
    //         }
    //         setIpfsIsOnline(nodeIsOnline);
    //         console.log("IFPS node is online: ", nodeIsOnline);
    //         // toast({
    //         //     id: "ipfs2",
    //         //     status: "success",
    //         //     duration: 3000,
    //         //     description: "IPFS node is online!",
    //         // });
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [ipfsIsOnline]);

    useEffect(() => {
        // due to issue with checkProfile
        if (isLoading) {
            initNearConnection(nearState);
            setIsLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    useEffect(() => {
        // run checkprofile only after connection is initialized.
        // making sure than the checkprofile happens after pnft is set to state
        if (!isLoading) {
            (async () => {
                await checkProfile(nearState);
            })();
        }
        // run code inside useEffects anytime each of the dependencies changes.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, nearState.accountId, nearState.pnftContract]);

    return (
        <ChakraProvider theme={theme}>
            <ThemeProvider attribute="class">
                <Component {...pageProps} />
            </ThemeProvider>
        </ChakraProvider>
    );
}

export default MyApp;
