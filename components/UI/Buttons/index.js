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
            size="sm"
            variant="outline"
            leftIcon={<MdOutlineDone />}
            > Followed 
        </Button>
    )
}

export const ReceiveIconButton = () => {
    return (
        <Button
            borderRadius={20}
            size="sm"
            variant="solid"
            leftIcon={<ArrowForwardIcon />}
            > Receive
        </Button>
    );
}

export const SendIconButton = () => {
    return (
        <Button
            borderRadius={20}
            size="sm"
            variant="solid"
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

