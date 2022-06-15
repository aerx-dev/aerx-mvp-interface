import { HStack, IconButton, useColorMode } from "@chakra-ui/react";
import { AccountIcon, FeedIcon, ProfileIcon } from "../UI/NavbarIcons";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import ChangeLanguage from "./change-language";
import ConnectWallet from "./connect-wallet";
import ToggleMode from "./toggle-mode";

const DesktopView = ({loggedIn}) =>{
    const { t } = useTranslation("header");  
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <HStack
        display={["none", "flex", "flex", "flex"]}>
           {loggedIn ? (
               <Link href={{pathname: '/flow'}}>
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
                   <Link href={{pathname: '/profile'}}>
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
                   <Link href={{pathname: '/account'}}>
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
               
           <ChangeLanguage />
           <ConnectWallet />
           ) : (
                <Button
                bgColor={colorMode === "light" ? "#8D00FF" : "#8D00FF" }
                color={colorMode === "light" ? "white" : "white" }
                padding={6}
                rounded="full"
                
            >
                Login/Register
            </Button>
           )}
       </HStack>
    )
}

export default DesktopView;

