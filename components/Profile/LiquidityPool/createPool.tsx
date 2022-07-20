import { Box, Button, Heading } from "@chakra-ui/react";
import React, { useState } from "react";

type CreatePoolProps = {
    handleClose: () => void;
};

const CreatePool = ({ handleClose }: CreatePoolProps) => {
    const [poolData, setPoolData] = useState({
        token: "",
        pair: "",
        totalFee: "",
    });

    return (
        <Box w={"100%"} h={"100%"}>
            <Heading>CreatePool</Heading>
            <Button onClick={handleClose}>BACK</Button>
        </Box>
    );
};

export default CreatePool;
