import { HStack, IconButton, useColorMode, Button } from "@chakra-ui/react";
import { AccountIcon, FeedIcon, ProfileIcon } from "../UI/NavbarIcons";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { loginToken, logout } from "../../lib/auth";
import ChangeLanguage from "./change-language";
import ConnectWallet from "./connect-wallet";
import { nearStore } from "../../stores/near";
import { FC } from "react";

interface IProps {
    loggedIn?: boolean
}
const DesktopView: FC<IProps> = ({ loggedIn }) => {
    const { t } = useTranslation("header");
    const { colorMode, toggleColorMode } = useColorMode();
    const state = nearStore((state) => state);

    return (
        <HStack display={["none", "flex", "flex", "flex"]}>
            {loggedIn ? (
                <>
                    <Link href={{ pathname: "/flow" }} passHref>
                        <IconButton
                            fontSize="lg"
                            _hover={{ bg: "none" }}
                            _active={{ bg: "none" }}
                            rounded="full"
                            variant={"ghost"}
                            icon={<FeedIcon />} 
                            aria-label={""}                        
                            ></IconButton>
                    </Link>
                    <Link href={{ pathname: "/profile" }} passHref>
                        <IconButton
                            fontSize="lg"
                            aria-label={t("ariaWallet")}
                            _hover={{ bg: "none" }}
                            _active={{ bg: "none" }}
                            rounded="full"
                            variant={"ghost"}
                            icon={<ProfileIcon />}
                        ></IconButton>
                    </Link>
                    <Link href={{ pathname: "/account" }} passHref>
                        <IconButton
                            fontSize="lg"
                            aria-label={t("ariaWallet")}
                            _hover={{ bg: "none" }}
                            _active={{ bg: "none" }}
                            rounded="full"
                            variant={"ghost"}
                            icon={<AccountIcon />}
                        ></IconButton>
                    </Link>

                    <ChangeLanguage />
                    <ConnectWallet />
                </>
            ) : (
                <Button
                    bgColor={colorMode === "light" ? "#8D00FF" : "#8D00FF"}
                    color={colorMode === "light" ? "white" : "white"}
                    padding={6}
                    rounded="full"
                    onClick={() => {
                        loginToken(state);
                    }}
                >
                    Login/Register
                </Button>
            )}
        </HStack>
    );
};

export default DesktopView;
