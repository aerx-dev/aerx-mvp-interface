import { Box } from "@chakra-ui/react";
import React from "react";

function NFTCard({ bg }) {
    return (
        <Box>
            <Box
                display="none"
                height="320px"
                rounded="lg"
                maxWidth={"100%"}
                bg={bg}
                margin="0 auto"
            ></Box>
        </Box>
    );
}

export default NFTCard;
