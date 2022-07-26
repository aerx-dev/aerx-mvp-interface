import { Input, useColorModeValue } from "@chakra-ui/react";
import React, { ChangeEvent, RefObject } from "react";

type CustomInputProps = {
    value: string;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    filter?: string;
    ref?: RefObject<HTMLInputElement> | null;
    size?: string;
};

const CustomInput = ({
    value,
    handleChange,
    placeholder,
    filter = "invert(0)",
    ref = null,
    size = "sm",
}: CustomInputProps) => {
    return (
        <Input
            value={value}
            onChange={handleChange}
            maxLength={500}
            placeholder={placeholder}
            borderRadius={20}
            filter={filter}
            ref={ref}
            size={size}
            border="none"
            bg={useColorModeValue("white", "#191A1B")}
        />
    );
};

export default CustomInput;
