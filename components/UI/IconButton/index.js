import React from "react";
import { IconButton } from "@chakra-ui/react";
import { IoHeartOutline, IoNotificationsOutline } from "react-icons/io5";
import { MdCopyAll } from "react-icons/md";
import { AddIcon } from "@chakra-ui/icons";


export const HeartIcon = () => {
    return (
        <IconButton 
            icon={<IoHeartOutline/>}
            variant="ghost"
            size="lg"
            isRound
            />
    );
};

export const NotificationIcon = () => {
    return (
        <IconButton 
            icon={<IoNotificationsOutline/>}
            variant="ghost"
            size="lg"
            isRound
            />
    );
};

export const CopyButton = () => {
    return (
        <IconButton 
            // onClick={prop} 
            variant='ghost'
            colorScheme='gray'
            isRound
            icon={<MdCopyAll />} 
            ml={2} />
    )
}

export const AddIconButton = () => {
    return (
        <IconButton
            type="submit"
            aria-label="post"
            isRound
            size="xs"
            icon={<AddIcon />}
            bgColor="#6054F0"
            color="white"
        />
    );
}



