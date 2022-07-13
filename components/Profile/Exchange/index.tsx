import React from "react";
import { useState, useEffect } from "react";
import { HiRefresh } from "react-icons/hi";
import { AiOutlineArrowLeft } from "react-icons/ai";

import {
    Box,
    Flex,
    VStack,
    Button,
    Text,
    Icon,
    useColorMode,
} from "@chakra-ui/react";
import ExchangeInput from "./input";

export type ExchangeProps = {
    flip: () => void;
};

const Exchange = ({ flip }) => {
    const { colorMode } = useColorMode();

    const [input, setInput] = useState("");
    const [output, setOutput] = useState(0);

    const handleInput = (e) => {
        setInput(e.target.value);
    };

    useEffect(() => {
        const calculateOutput = async () => {
            const num = Number(input);
            if (isNaN(num) || num < 0) return setOutput(0);

            // TODO: SHOULD CALCULATE REAL RATE AFTER TOKEN CONTRACT DEPLOYED
            // Call API to fetch the price
            setOutput(num * 20);
        };
        calculateOutput();
    }, [input]);

    const swap = async () => {
        // TODO: handle swapping tokens
    };

    return (
        <Box
            className="border-1 max-h-screen sticky top-20 min-h-max min-w-full"
            bg={"lightblack"}
            minW={"324px"}
        >
            <Flex
                justifyContent={"center"}
                direction="column"
                minH="81vh"
                maxH="82vh"
                overflowWrap="anywhere"
                py={5}
                px={10}
            >
                <Box
                    height="45vh"
                    position="relative"
                    bgSize="cover"
                    bgRepeat="no-repeat"
                    bgPosition="center"
                >
                    <Box className="z-10 bottom-0 h-1/3 w-full px-2 text-white">
                        <Text
                            className="h-1/4 mb-2"
                            fontWeight="bold"
                            fontSize="lg"
                            color={"gray"}
                            textAlign={"center"}
                        >
                            Transfer tokens
                        </Text>
                        <VStack className="bottom-0 gap-x-2 my-2">
                            <Box>
                                <ExchangeInput
                                    value={input}
                                    handleChange={handleInput}
                                    placeholder={"100"}
                                    currency={"NEAR"}
                                />
                                {/* TODO: CHANGE THE AMOUNT 102.4 TO VARIABLE */}
                                <Text
                                    color={"gray"}
                                    textAlign={"center"}
                                    fontSize={"sm"}
                                    mt={"16px"}
                                >
                                    Available: 102.4 NEAR
                                </Text>
                            </Box>
                            <Box>
                                <Text
                                    fontWeight="bold"
                                    fontSize="lg"
                                    color={"gray"}
                                    textAlign={"center"}
                                    my={"12px"}
                                >
                                    To
                                </Text>
                            </Box>
                            <Box>
                                <ExchangeInput
                                    value={output}
                                    handleChange={handleInput}
                                    placeholder={"100"}
                                    currency={"AEX"}
                                    disabled={true}
                                />
                                <Text
                                    color={"gray"}
                                    textAlign={"center"}
                                    fontSize={"sm"}
                                    my={"16px"}
                                >
                                    {/* TODO: CHANGE THE AMOUNT 3.9 TO VARIABLE */}
                                    1 NEAR = 20 AERX
                                </Text>
                            </Box>
                            <Button
                                borderRadius={20}
                                size="md"
                                width="100%"
                                bgColor={
                                    colorMode === "light"
                                        ? "#edf2f7"
                                        : "#edf2f714"
                                }
                                leftIcon={<HiRefresh />}
                                py={"20px"}
                                onClick={swap}
                            >
                                change
                            </Button>
                        </VStack>
                    </Box>
                </Box>
                <Flex
                    justifyContent={"center"}
                    alignItems={"center"}
                    onClick={flip}
                    w={"100%"}
                >
                    <Icon as={AiOutlineArrowLeft} color={"white"} />
                    <Text color={"white"} _hover={{ cursor: "pointer" }} ml={2}>
                        Back
                    </Text>
                </Flex>
            </Flex>
        </Box>
    );
};

export default Exchange;
