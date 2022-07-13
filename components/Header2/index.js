import { useState, useEffect } from "react";
import {
    Box,
    Image as ChakraImage,
    useColorMode,
    useColorModeValue,
    HStack,
} from "@chakra-ui/react";
import Link from "next/link";
import MobileView from "./mobileView";
import DesktopView from "./desktopView";
import useTranslation from "next-translate/useTranslation";
import { nearStore } from "../../stores/near.ts";

function Header() {
    const { colorMode } = useColorMode();
    const { t } = useTranslation("header");
    const bg = useColorModeValue("#ffffffdd", "gray.800");
    const state = nearStore((state) => state);
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
            className="sticky top-0 z-50 w-full bg-transparent py-4 px-4  md:px-10"
        >
            <Box className="flex flex-row items-center justify-center dippynav w-full">
                <div className="flex flex-1 gap-6">
                    <Link href={{ pathname: "/" }}>
                        <ChakraImage
                            src="/logo.svg"
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
                    <HStack
                        display={["none", "flex", "flex", "flex"]}
                        gap="24px"
                    >
                        <>
                            <Link href={{ pathname: "/flow" }} passHref>
                                Home
                            </Link>
                            <Link href={{ pathname: "/profile" }} passHref>
                                Features
                            </Link>
                            <Link href={{ pathname: "/account" }} passHref>
                                About us
                            </Link>
                        </>
                    </HStack>
                </div>
                <DesktopView loggedIn={loggedIn} />
                <MobileView loggedIn={loggedIn} />
            </Box>
        </Box>
    );
}

export default Header;
