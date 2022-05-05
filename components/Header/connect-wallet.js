import { IconButton, Icon, Box, SkeletonCircle, useColorModeValue } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { loginToken, loginNFT, logout } from "../../lib/auth";
import { useState, useEffect } from "react";
import { nearStore } from "../../stores/near.js";
import { getTotalSupply } from "../../lib/tokenContract";

function ConnectWallet() {
    const { t } = useTranslation("header");
    const [mounted, setMounted] = useState(false);
    const state = nearStore((state) => state);


    useEffect(() => {
        setMounted(true);
        // in this case, we only care to query the contract when signed in
        if (window.walletConnection && window.walletConnection.isSignedIn()) {
            // console.log(getTotalSupply());
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
			icon={
                    <Icon
						width="20" height="18" viewBox="0 0 20 18" fill="none"
					>
						<path dfill-rule="evenodd" clip-rule="evenodd" d="M19.9964 5.37513H15.7618C13.7911 5.37859 12.1947 6.93514 12.1911 8.85657C12.1884 10.7823 13.7867 12.3458 15.7618 12.3484H20V12.6543C20 16.0136 17.9636 18 14.5173 18H5.48356C2.03644 18 0 16.0136 0 12.6543V5.33786C0 1.97862 2.03644 0 5.48356 0H14.5138C17.96 0 19.9964 1.97862 19.9964 5.33786V5.37513ZM4.73956 5.36733H10.3796H10.3831H10.3902C10.8124 5.36559 11.1538 5.03019 11.152 4.61765C11.1502 4.20598 10.8053 3.87318 10.3831 3.87491H4.73956C4.32 3.87664 3.97956 4.20858 3.97778 4.61852C3.976 5.03019 4.31733 5.36559 4.73956 5.36733Z" fill={useColorModeValue("gray", "white")}/>
					</Icon>
					}
     
        >
        </IconButton>
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
			icon={
                    <Icon
						width="1em" 
						height="1em" 
						viewBox="0 0 24 24" 
						fill="none"
					>
						<path opacity="0.4" d="M2 6.447C2 3.996 4.03024 2 6.52453 2H11.4856C13.9748 2 16 3.99 16 6.437V17.553C16 20.005 13.9698 22 11.4744 22H6.51537C4.02515 22 2 20.01 2 17.563V16.623V6.447Z" fill={useColorModeValue("gray", "white")}/>
						<path d="M21.779 11.455L18.9332 8.54604C18.6391 8.24604 18.1657 8.24604 17.8726 8.54804C17.5804 8.85004 17.5814 9.33704 17.8745 9.63704L19.4338 11.23H17.9388H9.5485C9.13459 11.23 8.79858 11.575 8.79858 12C8.79858 12.426 9.13459 12.77 9.5485 12.77H19.4338L17.8745 14.363C17.5814 14.663 17.5804 15.15 17.8726 15.452C18.0196 15.603 18.2115 15.679 18.4043 15.679C18.5952 15.679 18.7871 15.603 18.9332 15.454L21.779 12.546C21.9202 12.401 22 12.205 22 12C22 11.796 21.9202 11.6 21.779 11.455Z" fill={useColorModeValue("gray", "white")}/>
					</Icon>
					}
        >
        </IconButton>
    );
}

export default ConnectWallet;
