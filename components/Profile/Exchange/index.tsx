import React from "react";
import { useState, useEffect } from "react";
import { HiRefresh } from "react-icons/hi";
import { AiOutlineArrowLeft } from "react-icons/ai";
import useCustomToast from "../../../hooks/useCustomToast";

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
import { nearStore } from "../../../stores/near";

export type ExchangeProps = {
    balance: number;
    flip: () => void;
};

const Exchange: React.VFC<ExchangeProps> = ({ balance, flip }) => {
    const { colorMode } = useColorMode();
    const toast = useCustomToast();

    const [input, setInput] = useState("");
    const [output, setOutput] = useState(0);

    const handleInput = (e: any) => {
        setInput(e.target.value);
    };

    const nearState = nearStore((state: any) => state);

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
    const _amount = "0"; // change this to amount of aex inputed(must be number in "" that is string)
    const _min_expected = "0"; //this is slippage(must be number in "" that is string)
    const swap = async () => {
        console.log("SWAP CLICKED, WILL PROCEED TO SWAP AEX FOR NEAR...");
        try {
            await nearState.profileContractWithUserAsSigner.swap({
                amount: _amount,
                min_expected: _min_expected,
            },
                "300000000000000", //attached gas 
                "1" //attached deposit
            );
            toast("success", "YOUR AEX HAS BEEN SWAPPED TO NEAR SUCCESSFULLY", "CNFTpost");
            //Todo: call get balance
        } catch (e: any) {
            console.log("ERROR SWAP COULD NOT BE COMPLETED");
            toast(
                "error",
                "SWAP ERROR: " + e.message,
                "CNFTerror",
            );

        }
    };

    return (
        <Box
            className="border-1 max-h-screen sticky top-20 min-h-max min-w-full"
            bg={"lightblack"}
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
                                    Available: {balance} NEAR
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
