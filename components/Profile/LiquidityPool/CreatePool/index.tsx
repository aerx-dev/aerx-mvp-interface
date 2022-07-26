import { Box, Text, useColorModeValue, Icon, VStack } from "@chakra-ui/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import PoolSelectors from "./poolSelectors";
import TotalFee from "./totalFee";

type CreatePoolProps = {
    handleClose: () => void;
};

const DUMMY_TOKEN_OPTIONS = ["NEAR", "AEX"];
const DUMMY_PAIR_OPTIONS = ["NEAR-AEX", "AEX-NEAR"];

const CreatePool = ({ handleClose }: CreatePoolProps) => {
    const [poolData, setPoolData] = useState({
        token: "",
        pair: "",
        totalFee: "",
    });

    const [tokenOptions, setTokenOptions] = useState<string[]>([]);
    const [pairOptions, setPairOptions] = useState<string[]>([]);

    const handleSelectOptions = (e: ChangeEvent<HTMLSelectElement>) => {
        setPoolData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const handleTotalFeeChange = (e: string) => {
        setPoolData((prev) => ({ ...prev, totalFee: e }));
    };

    useEffect(() => {
        const load = async () => {
            // TODO: fetch available token options and pair options
            setTokenOptions(DUMMY_TOKEN_OPTIONS);
            setPairOptions(DUMMY_PAIR_OPTIONS);
        };
        load();
    }, []);

    // useEffect(() => {
    //     console.dir(poolData);
    // }, [poolData]);

    return (
        <Box w={"100%"} h={"100%"}>
            <Icon
                as={MdOutlineArrowBackIosNew}
                onClick={handleClose}
                _hover={{ cursor: "pointer" }}
            />
            <VStack spacing={4}>
                <Text
                    fontSize="lg"
                    color={useColorModeValue("#1B1D1E", "white")}
                    textAlign={"center"}
                >
                    Create new pool
                </Text>
                <Box w={"100%"}>
                    <PoolSelectors
                        tokenOptions={tokenOptions}
                        pairOptions={pairOptions}
                        setPoolData={handleSelectOptions}
                    />
                </Box>

                <Box w={"100%"}>
                    <TotalFee
                        value={poolData.totalFee}
                        handleChange={handleTotalFeeChange}
                    />
                </Box>
            </VStack>
        </Box>
    );
};

export default CreatePool;
