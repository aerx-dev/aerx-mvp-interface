import { Text } from "@chakra-ui/react";
import React from "react";

type CenteredTextProps = {
    text: string;
    fontSize?: string;
    color?: string;
};

const CenteredText = ({ text, fontSize = "sm", color }: CenteredTextProps) => {
    return (
        <Text textAlign={"center"} fontSize={fontSize} color={color ?? "gray"}>
            {text}
        </Text>
    );
};

export default CenteredText;
