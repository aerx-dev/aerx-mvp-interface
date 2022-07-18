import {
    Box,
    Flex,
    HStack,
    Input,
    InputGroup,
    InputRightElement,
    Text,
} from "@chakra-ui/react";
import React, { ChangeEvent } from "react";
import NEAR_LOGO from "@/public/near.svg";
import AERX_LOGO from "@/public/aerx.svg";
import { ExchangeCurrencyType } from "@/types/exchange";

type InputProps = {
    value: string | number;
    placeholder: string;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    currency: ExchangeCurrencyType;
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
        <InputGroup maxW={"230px"} mx={"auto"}>
            <Input
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
                fontSize={"md"}
                rounded={"full"}
                h={"48px"}
                py={"20px"}
                pl={"20px"}
                pr={"40%"}
                border={"2px"}
                disabled={disabled}
                maxLength={mexLength}
                _focus={{ boxShadow: "none" }}
            />
            <InputRightElement
                pointerEvents="none"
                color="gray.300"
                width={"35%"}
                height={"100%"}
                justifyContent={"flex-end"}
            >
                {currency === "NEAR" ? <NearIcon /> : <AerxIcon />}
            </InputRightElement>
        </InputGroup>
    );
};

const NearIcon = () => (
    <Flex width={"100%"} alignItems={"center"}>
        <Text color={"gray"} fontWeight={"bold"} fontSize={"sm"} pr={2}>
            NEAR
        </Text>
        <NEAR_LOGO />
    </Flex>
);

const AerxIcon = () => (
    <Flex width={"100%"} alignItems={"center"}>
        <Text color={"gray"} fontWeight={"bold"} fontSize={"sm"} pr={2}>
            AEX
        </Text>
        <AERX_LOGO />
    </Flex>
);

export default ExchangeInput;
