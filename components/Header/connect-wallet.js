import { IconButton, Box, SkeletonCircle } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { IoWalletOutline, IoExitOutline } from "react-icons/io5";
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
      variant={"outline"}
      onClick={() => {
        loginToken(state);
      }}
    >
      <IoWalletOutline />
    </IconButton>
  ) : (
    <IconButton
      fontSize="lg"
      aria-label={t("ariaWallet")}
      _hover={{ bg: "none" }}
      _active={{ bg: "none" }}
      rounded="full"
      variant={"outline"}
      onClick={() => {
        logout(state);
      }}
    >
      <IoExitOutline />
    </IconButton>
  );
}

export default ConnectWallet;
