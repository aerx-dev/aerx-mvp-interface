import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { ChakraProvider } from "@chakra-ui/react";
import { initNearConnection, initIfps, checkProfile } from "../lib/auth.ts";
import {  getBalance, fetchpostsData } from "../lib/tokenContract";
import { nearStore } from "../stores/near.ts";
import { useEffect, useState } from "react";
import myTheme from "../lib/theme.js";
import "../components/Landing/slider.css";

function MyApp({ Component, pageProps }) {
    const [isLoading, setIsLoading] = useState(true);
    // const [ipfsIsOnline, setIpfsIsOnline] = useSessionStorage(
    //     "ipfsIsOnline",
    //     false,
    // );
    const nearState = nearStore((state) => state);
    
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, nearState.accountId, nearState.pnftContract]);

    useEffect(() => {
        // run checkprofile only after connection is initialized.
        // making sure than the checkprofile happens after pnft is set to state
        if (!isLoading) {
            (async () => {
                await  getBalance(nearState);
            })();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, nearState.accountId, nearState.tokenContract]);
    
    useEffect(() => {
        // run checkprofile only after connection is initialized.
        // making sure than the checkprofile happens after pnft is set to state
        if (!isLoading) {
            (async () => {
                await  fetchpostsData(nearState);
            })();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, nearState.accountId, nearState.pnftContract]);


    return (
            <ChakraProvider
                theme={myTheme}
            >
                <ThemeProvider attribute="class">
                    <Component {...pageProps} />
                </ThemeProvider>
            </ChakraProvider>


    );
}

export default MyApp;
