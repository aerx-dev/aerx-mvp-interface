import React from "react";
import { Button } from "@chakra-ui/react";
import {AddIcon,ArrowForwardIcon, ArrowUpIcon} from "@chakra-ui/icons";
import {RiSendPlaneFill} from "react-icons/ri";
import { MdOutlineDone } from "react-icons/md";
import { HiShoppingBag, HiOutlineDocumentSearch} from "react-icons/hi";

export const SendButton = () => {
    return (
        <Button
            borderRadius={20}
            bgColor="#6054F0"
            size="sm"
            variant="outline"
            leftIcon={<RiSendPlaneFill />} 
>
            Send
        </Button>
    );
}

export const FollowButton = () => {
    return (
        <Button
            borderRadius={20}
            bgColor="transparent"
			_hover={{ color:"black" }}
            size="sm"
            variant="outline"
            leftIcon={<MdOutlineDone />}
            > Followed 
        </Button>
    )
}

export const ReceiveIconButton = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Button
            borderRadius={20}
            size="sm"
            variant={colorMode === "light" ? "solid" : "outline" }
            leftIcon={<ArrowForwardIcon />}
            > Receive
        </Button>
    );
}

export const SendIconButton = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Button
            borderRadius={20}
            size="sm"
            variant={colorMode === "light" ? "solid" : "outline" }
            leftIcon={<ArrowUpIcon />}
            > Send
        </Button>
    );
}

export const PurpleButton = ({children,...rest}) => {
    return (
        <Button
            borderRadius={20}
            bgColor="#6054F0"
            size="sm"
            position="absolute"
            leftIcon={<HiShoppingBag />}
            {...rest}
        >{children}</Button>
    );
}
