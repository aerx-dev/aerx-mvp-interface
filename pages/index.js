import Head from "next/head";
import {
    HeroSection,
    EmailCapture,
    Features,
    Team,
} from "../components/Landing";
import Layout from "../components/Layout";
import { Box } from "@chakra-ui/react";
import styles from "../styles/Home.module.css";

export default function Home() {
    <Head>
        {/* Primary Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>;

    return (
        <Layout>
            <Box className="flex flex-col">
                <HeroSection />
                <Features />
                <Team />
                <EmailCapture />
            </Box>
        </Layout>
    );
}
