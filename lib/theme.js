import { extendTheme } from "@chakra-ui/react";

const myTheme = extendTheme({
    initialColorMode: 'dark',
    // useSystemColorMode: false,
    fonts: {
        heading: "Open Sans",
        body: "Open Sans",
    },
    colors: {
        lightblack: "#1E2021",
        gray:{
            800: "#131414",
        }
    },
});

export default myTheme;
