import { Box, Input, Text } from "@chakra-ui/react";
import React, { ChangeEvent } from "react";

type InputProps = {
    value: string | number;
    placeholder: string;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    currency: string;
    disabled?: boolean;
    mexLength?: number;
};

const ExchangeInput: React.VFC<InputProps> = ({
    value,
    placeholder,
    handleChange,
    currency,
    disabled = false,
    // TODO: total supply or decimals
    mexLength = 19,
}) => {
    return (
        <Box position={"relative"}>
            <Input
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
                fontSize={"md"}
                rounded={"full"}
                py={"20px"}
                px={"24px"}
                border={"2px"}
                disabled={disabled}
                maxLength={mexLength}
            />
            <Text
                color={"gray"}
                fontWeight={"bold"}
                fontSize={"md"}
                position={"absolute"}
                top={"10px"}
                right={5}
            >
                {currency}
            </Text>
        </Box>
    );
};

export default ExchangeInput;
