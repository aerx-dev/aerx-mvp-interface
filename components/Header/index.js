import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import Image from "next/image";
import ChangeLanguage from "./change-language";
import ConnectWallet from "./connect-wallet";
import ToggleMode from "./toggle-mode";
import {
    Box,
    Image as ChakraImage,
    HStack,
    useColorMode,
    useColorModeValue,
    IconButton,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { AiOutlineUser, AiOutlineProfile } from "react-icons/ai";
import { IoNewspaperOutline, IoSettingsOutline } from "react-icons/io5";
import { nearStore } from "../../stores/near.js";

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
            className="sticky top-0 z-50 w-full bg-transparent py-4 px-4 md:px-10"
        >
            <Box className="flex flex-row items-center justify-center w-full">
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
                                    ? "invert(1)"
                                    : "invert(0)"
                            }
                        />
                    </Link>
                </div>

                <HStack>
                    {loggedIn ? (
                        <>
                            <Link href="/feed">
                                <IconButton
                                    fontSize="lg"
                                    aria-label={t("ariaWallet")}
                                    _hover={{ bg: "none" }}
                                    _active={{ bg: "none" }}
                                    rounded="full"
                                    variant={"outline"}
                                >
                                    <IoNewspaperOutline />
                                </IconButton>
                            </Link>

                            <Link href="/account">
                                <IconButton
                                    fontSize="lg"
                                    aria-label={t("ariaWallet")}
                                    _hover={{ bg: "none" }}
                                    _active={{ bg: "none" }}
                                    rounded="full"
                                    variant={"outline"}
                                >
                                    <IoSettingsOutline />
                                </IconButton>
                            </Link>

                            <Link href="/profile">
                                <IconButton
                                    fontSize="lg"
                                    aria-label={t("ariaWallet")}
                                    _hover={{ bg: "none" }}
                                    _active={{ bg: "none" }}
                                    rounded="full"
                                    variant={"outline"}
                                >
                                    <AiOutlineUser />
                                </IconButton>
                            </Link>
                        </>
                    ) : (
                        <></>
                    )}

                    <ToggleMode />
                    <ChangeLanguage />
                    <ConnectWallet />
                </HStack>
            </Box>
        </Box>
    );
}

export default Header;
