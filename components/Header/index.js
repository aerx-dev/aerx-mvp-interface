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
	Menu,
	Icon,
	MenuButton,
	MenuList,
	MenuItem,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { AiOutlineMenu } from "react-icons/ai";
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
                                    ? "brightness(0.45)"
                                    : "invert(0)"
                            }
                        />
                    </Link>
                </div>

                <HStack
				 display={["none", "flex", "flex", "flex"]}>
                    {loggedIn ? (
                        <>
                            <Link href="/feed">
                                <IconButton
                                    fontSize="lg"
                                    aria-label={t("ariaFeed")}
                                    _hover={{ bg: "none" }}
                                    _active={{ bg: "none" }}
                                    rounded="full"
									variant={"ghost"}
									icon={
                    <Icon
						width="1em" 
						height="1em" 
						viewBox="0 0 25 24" fill="none"
					>
						<path opacity="0.4" d="M16.7502 2H8.474C5.472 2 3.72412 3.78 3.72412 6.83V17.16C3.72412 20.26 5.472 22 8.474 22H16.7502C19.8006 22 21.4991 20.26 21.4991 17.16V6.83C21.4991 3.78 19.8006 2 16.7502 2" fill={useColorModeValue("gray", "white")}/>
						<path fill-rule="evenodd" clip-rule="evenodd" d="M8.74109 6.6499V6.6599C8.31548 6.6599 7.97084 7.0099 7.97084 7.4399C7.97084 7.8699 8.31548 8.2199 8.74109 8.2199H11.6927C12.1183 8.2199 12.464 7.8699 12.464 7.4289C12.464 6.9999 12.1183 6.6499 11.6927 6.6499H8.74109ZM16.4831 12.7399H8.74109C8.31548 12.7399 7.97084 12.3899 7.97084 11.9599C7.97084 11.5299 8.31548 11.1789 8.74109 11.1789H16.4831C16.9077 11.1789 17.2533 11.5299 17.2533 11.9599C17.2533 12.3899 16.9077 12.7399 16.4831 12.7399ZM16.4827 17.3099H8.74072C8.44447 17.3499 8.15809 17.1999 8.00009 16.9499C7.84209 16.6899 7.84209 16.3599 8.00009 16.1099C8.15809 15.8499 8.44447 15.7099 8.74072 15.7399H16.4827C16.8767 15.7799 17.174 16.1199 17.174 16.5299C17.174 16.9289 16.8767 17.2699 16.4827 17.3099Z" fill={useColorModeValue("gray", "white")}/>
					</Icon>
					}
                                >
                                </IconButton>
                            </Link>

                        </>
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
									icon={
                    <Icon
						width="1em" 
						height="1em" 
						viewBox="0 0 25 24" fill="none"
					>
						<path d="M12.4088 15.1743C8.14967 15.1743 4.51172 15.8543 4.51172 18.5743C4.51172 21.2953 8.12696 21.9993 12.4088 21.9993C16.6678 21.9993 20.3058 21.3203 20.3058 18.5993C20.3058 15.8783 16.6915 15.1743 12.4088 15.1743" fill={useColorModeValue("gray", "white")}/>
						<path opacity="0.4" d="M12.4087 12.5835C15.31 12.5835 17.6346 10.2285 17.6346 7.29151C17.6346 4.35451 15.31 1.99951 12.4087 1.99951C9.50842 1.99951 7.18286 4.35451 7.18286 7.29151C7.18286 10.2285 9.50842 12.5835 12.4087 12.5835" fill={useColorModeValue("gray", "white")}/>
					</Icon>
					}
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
									icon={
                    <Icon
						width="1em" 
						height="1em" 
						viewBox="0 0 25 24" fill="none"
					>
						<path d="M12.8238 14.8302C11.2394 14.8302 9.95776 13.5802 9.95776 12.0102C9.95776 10.4402 11.2394 9.18018 12.8238 9.18018C14.4083 9.18018 15.6596 10.4402 15.6596 12.0102C15.6596 13.5802 14.4083 14.8302 12.8238 14.8302" fill={useColorModeValue("gray", "white")}/>
						<path opacity="0.4" d="M21.9267 14.37C21.7349 14.07 21.4624 13.77 21.1092 13.58C20.8267 13.44 20.645 13.21 20.4835 12.94C19.9689 12.08 20.2716 10.95 21.1294 10.44C22.1386 9.87 22.4615 8.6 21.8762 7.61L21.2001 6.43C20.6248 5.44 19.3633 5.09 18.3643 5.67C17.4762 6.15 16.3358 5.83 15.8211 4.98C15.6596 4.7 15.5688 4.4 15.589 4.1C15.6193 3.71 15.4982 3.34 15.3165 3.04C14.9431 2.42 14.267 2 13.5202 2H12.0972C11.3605 2.02 10.6844 2.42 10.311 3.04C10.1192 3.34 10.0082 3.71 10.0284 4.1C10.0486 4.4 9.95776 4.7 9.79629 4.98C9.28161 5.83 8.14123 6.15 7.26324 5.67C6.25406 5.09 5.00267 5.44 4.41734 6.43L3.74119 7.61C3.16596 8.6 3.4889 9.87 4.48799 10.44C5.34579 10.95 5.64855 12.08 5.14396 12.94C4.9724 13.21 4.79074 13.44 4.50817 13.58C4.16505 13.77 3.86229 14.07 3.70082 14.37C3.32743 14.99 3.34761 15.77 3.72101 16.42L4.41734 17.62C4.79074 18.26 5.48708 18.66 6.21369 18.66C6.55681 18.66 6.96049 18.56 7.28342 18.36C7.53572 18.19 7.83847 18.13 8.17151 18.13C9.1706 18.13 10.0082 18.96 10.0284 19.95C10.0284 21.1 10.9569 22 12.1275 22H13.5C14.6606 22 15.589 21.1 15.589 19.95C15.6193 18.96 16.4569 18.13 17.456 18.13C17.7789 18.13 18.0817 18.19 18.3441 18.36C18.667 18.56 19.0606 18.66 19.4138 18.66C20.1303 18.66 20.8267 18.26 21.2001 17.62L21.9065 16.42C22.2698 15.75 22.3001 14.99 21.9267 14.37" fill={useColorModeValue("gray", "white")}/>
					</Icon>
					}
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
								variant={"ghost"}
								
							/>
							<MenuList>
							<MenuItem>
                            <Link href="/feed">
                                Feed
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
