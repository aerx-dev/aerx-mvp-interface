import { useState, useEffect } from "react";
import {
    Box,
    Image as ChakraImage,
    useColorMode,
    useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import SearchProfile from "../SearchProfile";
import MobileView from "./mobileView";
import DesktopView from "./desktopView";
import useTranslation from "next-translate/useTranslation";
import { nearStore } from "../../stores/near";

function Header() {
    const { colorMode } = useColorMode();
    const { t } = useTranslation("header");
    const bg = useColorModeValue("#ffffffdd", "gray.800");
    const state = nearStore((state) => state);
    const postBg = useColorModeValue("gray.100", "gray.900");
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (state.walletConnection && state.walletConnection.isSignedIn()) {
            setLoggedIn(true);
        }
    }, [state.walletConnection]);

    return (
        <Box
            bg={bg}
            as="nav"
            backdropFilter={"blur(8px)"}
            className="sticky top-0 z-0 w-full bg-transparent py-4 px-4  md:px-10"
        >
            <Box
                maxW={"1440px"} // TODO: change the value to constants
                className="flex flex-row items-center justify-center dippynav"
            >
                <div className="flex-1">
                    <Link href={{ pathname: "/" }}>
                        <ChakraImage
                            src="/images/white-logo.svg"
                            alt={t("logoAlt")}
                            className="rounded-sm"
                            layout="responsive"
                            priority="true"
                            cursor={"pointer"}
                            width={"80px"}
                            filter={
                                colorMode === "light"
                                    ? "brightness(0.45)"
                                    : "invert(0)"
                            }
                        />
                    </Link>
                </div>
                <div className="flex flex-1">
                    <SearchProfile state={state} bg={postBg} />
                </div>
                <DesktopView loggedIn={loggedIn} />
                <MobileView loggedIn={loggedIn} />
            </Box>
        </Box>
    );
}

export default Header;
