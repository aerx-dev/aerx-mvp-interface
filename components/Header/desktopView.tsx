import { HStack, IconButton } from "@chakra-ui/react";
import { AccountIcon, FeedIcon, ProfileIcon } from "../UI/NavbarIcons";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import ChangeLanguage from "./change-language";
import ConnectWallet from "./connect-wallet";
import ToggleMode from "./toggle-mode";
import { FC } from "react";

interface IProps {
    loggedIn?: boolean;
}
const DesktopView: FC<IProps> = ({ loggedIn }) => {
    const { t } = useTranslation("header");
    return (
        <HStack display={["none", "flex", "flex", "flex"]}>
            {loggedIn ? (
                <Link href="/flow">
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
                            icon={<ProfileIcon />}
                        ></IconButton>
                    </Link>
                    <Link href="/account">
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
                </>
            ) : (
                <></>
            )}
            <ChangeLanguage />
            <ConnectWallet />
        </HStack>
    );
};

export default DesktopView;
