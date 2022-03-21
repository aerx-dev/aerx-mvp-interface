import { Box } from "@chakra-ui/react";
import Feature1 from "./01-section";
import Feature2 from "./02-section";
import Feature3 from "./03-section";
import Feature4 from "./04-section";
import Feature5 from "./05-section";
import Feature6 from "./06-section";

function Features() {
    return (
        <Box as="section" pt={50}>
            <Feature1 />
            <Feature2 />
            <Feature3 />
            <Feature4 />
            <Feature5 />
            <Feature6 />
        </Box>
    );
}

export default Features;
