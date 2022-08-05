import {
    HStack,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
} from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import ChangeLanguage from "./change-language";
import ConnectWallet from "./connect-wallet";
import ToggleMode from "./toggle-mode";

interface IProps {
    loggedIn?: boolean
}

const MobileView: FC<IProps> = ({ loggedIn }) => {
    return (
        <HStack display={["flex", "none", "none", "none"]}>
            <ToggleMode />
            <ChangeLanguage />
            <ConnectWallet />

            {loggedIn ? (
                <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label="Menu"
                        icon={<AiOutlineMenu />}
                        variant={"outline"}
                        _hover={{ bg: "none" }}
                        _active={{ bg: "none" }}
                        rounded="full"
                    />
                    <MenuList color="gray" maxWidth={"100px"}>
                        <MenuItem>
                            <Link href="/flow">Flow</Link>
                        </MenuItem>
                        <MenuItem>
                            <Link href="/account">Account</Link>
                        </MenuItem>
                        <MenuItem>
                            <Link href="/profile">Profile</Link>
                        </MenuItem>
                    </MenuList>
                </Menu>
            ) : (
                <></>
            )}
        </HStack>
    );
};

export default MobileView;
