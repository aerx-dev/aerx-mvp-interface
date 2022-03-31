import { extendTheme } from "@chakra-ui/react";

const myTheme = extendTheme({
    initialColorMode: 'dark',
    // useSystemColorMode: false,
    fonts: {
        heading: "Poppins",
        body: "Work Sans",
    },
});

export default myTheme;
