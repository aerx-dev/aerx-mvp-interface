import CenteredText from "@/components/UI/Texts/CenteredText";
import {
    Grid,
    GridItem,
    Select,
    VStack,
    useColorModeValue,
    useColorMode,
} from "@chakra-ui/react";
import React, { ChangeEvent, useState } from "react";

type PoolSelectorsProps = {
    tokenOptions: string[];
    pairOptions: string[];
    setPoolData: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const PoolSelectors = ({
    tokenOptions,
    pairOptions,
    setPoolData,
}: PoolSelectorsProps) => {
    return (
        <Grid templateColumns="repeat(2, 1fr)" gridTemplateRows={"1fr"} gap={2}>
            <GridItem colSpan={1}>
                <VStack spacing={2}>
                    <CenteredText text={"Token"} />
                    <CustomSelect
                        name="token"
                        options={tokenOptions}
                        onChange={setPoolData}
                    />
                </VStack>
            </GridItem>
            <GridItem colSpan={1}>
                <VStack spacing={2}>
                    <CenteredText text={"Pair"} />
                    <CustomSelect
                        name="pair"
                        options={pairOptions}
                        onChange={setPoolData}
                    />
                </VStack>
            </GridItem>
        </Grid>
    );
};

type CustomSelectProps = {
    name: string;
    onChange: PoolSelectorsProps["setPoolData"];
    options: string[];
};
const CustomSelect = ({ name, onChange, options }: CustomSelectProps) => {
    const [isSelected, setIsSelected] = useState(false);
    const { colorMode } = useColorMode();

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setIsSelected(e.target.value !== "");
        onChange(e);
    };

    const isDarkMode = colorMode === "dark";

    return (
        <Select
            name={name}
            placeholder="Select"
            onChange={handleChange}
            rounded={"full"}
            background={useColorModeValue("white", "#191A1B")}
            border={"none"}
            color={!isSelected ? "gray" : isDarkMode ? "white" : "#191A1B"}
            _hover={{ cursor: "pointer" }}
            defaultValue={""}
            fontSize={"sm"}
        >
            {options.map((option) => (
                <option key={option} value={option} color="white">
                    {option}
                </option>
            ))}
        </Select>
    );
};

export default PoolSelectors;
