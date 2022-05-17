import { useState, useEffect } from "react";
import Link from "next/link";
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
	Menu,
	Icon,
	MenuButton,
	MenuList,
	MenuItem,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { AiOutlineMenu } from "react-icons/ai";
import { nearStore } from "../../stores/near.js";
import { AccountIcon, FeedIcon, ProfileIcon } from "../UI/NavbarIcons";

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
                                    ? "brightness(0.45)"
                                    : "invert(0)"
                            }
                        />
                    </Link>
                </div>

                <HStack
				 display={["none", "flex", "flex", "flex"]}>
                    {loggedIn ? (
                        <Link href="/flow">
                            <IconButton
                                fontSize="lg"
                                _hover={{ bg: "none" }}
                                _active={{ bg: "none" }}
                                rounded="full"
                                variant={"ghost"}
                                icon={<FeedIcon/>}
                                >
                            </IconButton>
                        </Link>
                    ) : (
                        <></>
                    )}

                    <ToggleMode />
					{loggedIn ? (
                        <>
                            <Link href="/profile">
                                <IconButton
                                    fontSize="lg"
                                    aria-label={t("ariaWallet")}
                                    _hover={{ bg: "none" }}
                                    _active={{ bg: "none" }}
                                    rounded="full"
									variant={"ghost"}
									icon={<ProfileIcon/>}
                                >
                                </IconButton>
                            </Link>
							<Link href="/account">
                                <IconButton
                                    fontSize="lg"
                                    aria-label={t("ariaWallet")}
                                    _hover={{ bg: "none" }}
                                    _active={{ bg: "none" }}
                                    rounded="full"
									variant={"ghost"}
									icon={<AccountIcon/>}
                                >
                                </IconButton>
                            </Link>
                        </>
                    ) : (
                        <></>
                    )}
                    <ChangeLanguage />
                    <ConnectWallet />
                </HStack>
				
				
				<HStack
				 display={["flex", "none", "none", "none"]}>
                    <ToggleMode />
                    <ChangeLanguage />
                    <ConnectWallet />
					
				{loggedIn ? (
                        <Menu>
							<MenuButton
								as={IconButton}
								aria-label='Menu'
								icon={<AiOutlineMenu />}
								variant={"outline"}
								_hover={{ bg: "none" }}
								_active={{ bg: "none" }}
								rounded="full"
								
							/>
							<MenuList>
							<MenuItem>
                            <Link href="/flow">
                                flow
                            </Link>
							</MenuItem>
							<MenuItem>
                            <Link href="/account">
                                Account
                            </Link>
							</MenuItem>
							<MenuItem>
                            <Link href="/profile">
                                Profile
                            </Link>
							</MenuItem>
							</MenuList>
                        </Menu>
                    ) : (
                        <></>
                    )}
                </HStack>				
            </Box>
        </Box>
    );
}

export default Header;
