import Header from "./Header";
import Head from "next/head";
import { Box } from "@chakra-ui/react";

const Layout: React.FC = ({ children }) => {
    return (
        <div>
            <Head>
                <title>aerx</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <Header />
            <main>
                <Box maxW={"1440px"} mx={"auto"}>
                    {children}
                </Box>
            </main>
        </div>
    );
};

export default Layout;
