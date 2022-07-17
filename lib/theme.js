import { extendTheme } from "@chakra-ui/react";

const myTheme = extendTheme({
    initialColorMode: "dark",
    // useSystemColorMode: false,
    fonts: {
        heading: "Open Sans",
        body: "Open Sans",
    },
    colors: {
        brand: "#6054F0",
        lightblack: "#1E2021",
        gray: {
            800: "#131414",
        },
    },
});

export default myTheme;
