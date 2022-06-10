import { Box } from "@chakra-ui/react";
import Feature1 from "./01-section";
import Feature2 from "./02-section";

function Features() {
    return (
        <Box as="section" pt={50}>
            <Feature1 />
            <Feature2 />
        </Box>
    );
}

export default Features;
