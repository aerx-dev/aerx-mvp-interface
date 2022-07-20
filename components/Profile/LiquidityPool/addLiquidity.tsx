import { Box, Button, Text } from "@chakra-ui/react";
import React, { useState } from "react";

type AddLiquidityProps = {
    targetPool: string;
    handleClose: () => void;
};

const AddLiquidity = ({ targetPool, handleClose }: AddLiquidityProps) => {
    const [amount, setAmount] = useState(0);

    return (
        <Box w={"100%"} h={"100%"}>
            <Text>{targetPool}</Text>
            <Button onClick={handleClose} colorScheme={"cyan"}>
                BACK
            </Button>
        </Box>
    );
};

export default AddLiquidity;
