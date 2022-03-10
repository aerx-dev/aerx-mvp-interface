import { Heading, Box } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import Slider from "./slider";

function Features() {
    const { t } = useTranslation("landing");
    return (
        <Box as="section" pt={50}>
            <Slider />
        </Box>
    );
}

export default Features;
