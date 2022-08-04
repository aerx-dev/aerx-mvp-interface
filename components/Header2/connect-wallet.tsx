import {
    IconButton,
    Icon,
    Box,
    SkeletonCircle,
    useColorModeValue,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { loginToken, logout } from "../../lib/auth";
import { useState, useEffect } from "react";
import { nearStore } from "../../stores/near";
import { WalletSignedIn, WalletSignedOut } from "../UI/NavbarIcons";

function ConnectWallet() {
    const { t } = useTranslation("header");
    const [mounted, setMounted] = useState(false);
    const state = nearStore((state) => state);

    useEffect(() => {
        setMounted(true);
        // in this case, we only care to query the contract when signed in
        if ((window as any).walletConnection && (window as any).walletConnection.isSignedIn()) {
        }
    }, []);

    if (!mounted) {
        return <div />;
    }

    if (!state.walletConnection)
        return (
            <Box borderWidth="1px" rounded="full">
                <SkeletonCircle width="40px" height="40px" />
            </Box>
        );

    return !state.walletConnection.isSignedIn() ? (
        <IconButton
            fontSize="lg"
            aria-label={t("ariaWallet")}
            _hover={{ bg: "none" }}
            _active={{ bg: "none" }}
            rounded="full"
            variant={"ghost"}
            onClick={() => {
                loginToken(state);
            }}
            icon={<WalletSignedIn />}
        ></IconButton>
    ) : (
        <IconButton
            fontSize="lg"
            aria-label={t("ariaExit")}
            _hover={{ bg: "none" }}
            _active={{ bg: "none" }}
            rounded="full"
            variant={"ghost"}
            onClick={() => {
                logout(state);
            }}
            icon={<WalletSignedOut />}
        ></IconButton>
    );
}

export default ConnectWallet;
