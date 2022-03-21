import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { ChakraProvider } from "@chakra-ui/react";
import { initNearConnection, initIfps, checkProfile } from "../lib/auth";
import { nearStore } from "../stores/near.js";
import { useEffect, useState } from "react";
import theme from "../lib/theme.js";
import "../components/Landing/slider.css";
import { useSessionStorage } from "beautiful-react-hooks"



function MyApp({ Component, pageProps }) {
    const [isLoading, setIsLoading] = useState(true);
    const [ipfsIsOnline, setIpfsIsOnline] = useSessionStorage("ipfsIsOnline", false);
    const nearState = nearStore((state) => state);

    // const toast = useToast();

    useEffect(() => {
        if (!ipfsIsOnline) {
            // toast({
            //     id: "ipfs1",
            //     status: "info",
            //     duration: 3000,
            //     description: "Starting IPFS node...",
            // });
            var nodeIsOnline;
            if (window.ipfs) {
                nodeIsOnline = window.ipfs.isOnline();
            }
            else {
                nodeIsOnline = initIfps()
            }
            setIpfsIsOnline(nodeIsOnline)
            console.log("IFPS node is online: ", nodeIsOnline);
            // toast({
            //     id: "ipfs2",
            //     status: "success",
            //     duration: 3000,
            //     description: "IPFS node is online!",
            // });
        }
    }, [ipfsIsOnline])


    useEffect(() => {
        if (isLoading) {
            // setIpfsIsOnline(false)
            initNearConnection(nearState)
            checkProfile(nearState)
            setIsLoading(false)
            // toast({
            //     id: "loading",
            //     status: "success",
            //     duration: 3000,
            //     description: "NEAR account loaded!",
            //     variant: "solid",
            // });
        }
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
