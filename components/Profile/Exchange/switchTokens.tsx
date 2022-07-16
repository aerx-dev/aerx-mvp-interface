import {
    Box,
    Button,
    Divider,
    Flex,
    IconButton,
    useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { CgArrowsExchangeAltV } from "react-icons/cg";

type SwitchTokenProps = {
    handleClick: () => void;
};

const SwitchToken = ({ handleClick }: SwitchTokenProps) => {
    const bg = useColorModeValue("gray", "lightblack");

    return (
        <Flex
            w={"100%"}
            minH={24}
            position={"relative"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <Divider />
            <Flex
                w={"100%"}
                h={"100%"}
                position={"absolute"}
                top={0}
                left={0}
                justifyContent={"center"}
                alignItems={"center"}
                zIndex={100}
            >
                <Box
                    background={bg}
                    borderWidth={1}
                    padding={2}
                    rounded={"full"}
                    _hover={{ cursor: "pointer", background: "gray.900" }}
                    onClick={handleClick}
                >
                    <CgArrowsExchangeAltV size={24} color={"gray"} />
                </Box>
            </Flex>
        </Flex>
    );
};

export default SwitchToken;
