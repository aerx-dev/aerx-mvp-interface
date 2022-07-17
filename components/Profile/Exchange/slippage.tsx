import {
    useRadio,
    Box,
    useRadioGroup,
    HStack,
    UseRadioProps,
    Input,
    Text,
    chakra,
    Stack,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";

type SlippageProps = {
    handleChange: (e: string) => void;
};

const Slippage = ({ handleChange }: SlippageProps) => {
    const options = ["0.1", "0.5", "1"];

    const { getRadioProps, getRootProps } = useRadioGroup({
        name: "slippage",
        defaultValue: "0.1",
        onChange: handleChange,
    });

    return (
        <Stack
            {...getRootProps()}
            pos={"relative"}
            minH={"40px"}
            maxW={"230px"}
            mx={"auto"}
        >
            <Input
                disabled={true}
                rounded={"full"}
                borderWidth={2}
                h={"48px"}
                position={"absolute"}
                pointerEvents={"none"}
                _hover={{
                    cursor: "none",
                }}
            />
            <HStack w={"100%"} position={"absolute"} justifyContent={"center"}>
                {options.map((option) => {
                    return (
                        <CustomRadio
                            key={option}
                            text={option}
                            {...getRadioProps({ value: option })}
                        />
                    );
                })}
            </HStack>
        </Stack>
    );
};

export type RadioCardProps = {
    radioProps: UseRadioProps;
    children: ReactNode;
};

function CustomRadio(props: any) {
    const { text, ...radioProps } = props;
    const { state, getInputProps, getCheckboxProps, htmlProps, getLabelProps } =
        useRadio(radioProps);

    return (
        <chakra.label {...htmlProps} cursor="pointer">
            <input {...getInputProps({})} hidden />
            <Box
                {...getCheckboxProps()}
                color={state.isChecked ? "white" : "gray"}
                p={1}
                minW={"33%"}
            >
                <Text {...getLabelProps()}>{text}%</Text>
            </Box>
        </chakra.label>
    );
}

export default Slippage;
