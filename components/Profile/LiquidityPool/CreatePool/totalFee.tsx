import CenteredText from "@/components/UI/Texts/CenteredText";
import {
    useRadio,
    Box,
    useRadioGroup,
    useColorModeValue,
    UseRadioProps,
    Input,
    Text,
    chakra,
    Stack,
    VStack,
    Grid,
    GridItem,
    Flex,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";

type TotalFeeProps = {
    value: string;
    handleChange: (e: string) => void;
};
const MIN_HEIGHT = "41px";

const TotalFee = ({ value, handleChange }: TotalFeeProps) => {
    // TODO: change the options
    const options = ["0.20", "0.30", "0.60"];

    const { getRadioProps, getRootProps } = useRadioGroup({
        name: "slippage",
        defaultValue: "0.1",
        onChange: handleChange,
    });

    return (
        <VStack {...getRootProps()} spacing={2} w={"100%"}>
            <CenteredText text={"Total fee"} />

            <Grid
                templateColumns="repeat(10, 1fr)"
                gridTemplateRows={"1fr"}
                gap={1}
                w={"100%"}
            >
                <GridItem
                    colSpan={8}
                    minH={MIN_HEIGHT}
                    position={"relative"}
                    background={useColorModeValue("white", "#191A1B")}
                    rounded={"full"}
                >
                    <Input
                        disabled={true}
                        rounded={"full"}
                        h={MIN_HEIGHT}
                        w={"100%"}
                        pointerEvents={"none"}
                        _hover={{
                            cursor: "none",
                        }}
                        position={"absolute"}
                        top={0}
                        background={useColorModeValue("white", "#191A1B")}
                        border={"none"}
                    />
                    <Grid
                        templateColumns="repeat(3, 1fr)"
                        gridTemplateRows={"1fr"}
                        gap={1}
                        w={"100%"}
                        position={"absolute"}
                    >
                        {options.map((option) => {
                            return (
                                <GridItem key={option} colSpan={1}>
                                    <CustomRadio
                                        key={option}
                                        text={option}
                                        {...getRadioProps({ value: option })}
                                    />
                                </GridItem>
                            );
                        })}
                    </Grid>
                </GridItem>
                <GridItem colSpan={2}>
                    <Flex
                        h={"100%"}
                        justifyContent={"flex-end"}
                        alignItems={"center"}
                    >
                        <CenteredText text={`${value}%`} />
                    </Flex>
                </GridItem>
            </Grid>
        </VStack>
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
        <chakra.label
            {...htmlProps}
            cursor="pointer"
            minW={"33%"}
            rounded={"full"}
        >
            <input {...getInputProps({})} hidden />
            <Box
                {...getCheckboxProps()}
                color={state.isChecked ? "white" : "gray"}
                p={2}
                minW={"100%"}
                _checked={{
                    bg: "brand",
                    color: "white",
                    borderColor: "teal.600",
                }}
                rounded={"full"}
            >
                <Text
                    {...getLabelProps()}
                    textAlign={"center"}
                    fontSize={"sm"}
                    fontWeight={"medium"}
                >
                    {text}%
                </Text>
            </Box>
        </chakra.label>
    );
}

export default TotalFee;
