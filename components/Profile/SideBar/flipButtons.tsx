import React from "react";
import { Box, VStack, Icon, Heading, Text, HStack } from "@chakra-ui/react";
import {
    ReceiveIconButton,
    SendIconButton,
    SwapIconButton,
} from "../../UI/Buttons";

type FlipButtonsProps = {
    flip: () => void;
    setToSend: (toSend: boolean) => void;
};

const FlipButtons = ({ flip, setToSend }: FlipButtonsProps) => {
    const handleClick = (type: "swap" | "send") => {
        setToSend(type === "send");
        flip();
    };

    return (
        <HStack justifyContent="space-evenly" width="100%">
            <SendIconButton handleClick={() => handleClick("send")} />
            <ReceiveIconButton />
            <SwapIconButton handleClick={() => handleClick("swap")} />
        </HStack>
    );
};

export default FlipButtons;
