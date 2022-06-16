import { HStack , Menu, MenuButton, MenuList, MenuItem, IconButton, useColorMode } from "@chakra-ui/react";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
import ChangeLanguage from "./change-language";
import ConnectWallet from "./connect-wallet";
import ToggleMode from "./toggle-mode";
import { loginToken, logout } from "../../lib/auth";
import { nearStore } from "../../stores/near.js";


const MobileView = ({loggedIn}) => {
    const { t } = useTranslation("header");  
    const { colorMode, toggleColorMode } = useColorMode();
    const state = nearStore((state) => state);
    
    return (
        <HStack
            display={["flex", "none", "none", "none"]}>
                
                
            {loggedIn ? (
             <ChangeLanguage />
                <ConnectWallet />
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
                        <MenuList color="gray" maxWidth={"100px"}>
                        <MenuItem>
                        <Link href="/flow">
                            Flow
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
                     <Button
                bgColor={colorMode === "light" ? "#8D00FF" : "#8D00FF" }
                color={colorMode === "light" ? "white" : "white" }
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
    )
}

export default MobileView;
