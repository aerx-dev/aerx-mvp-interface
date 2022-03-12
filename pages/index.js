import Head from "next/head";
import { HeroSection, Features, Team } from "../components/Landing";
import Layout from "../components/Layout";
import { Box } from "@chakra-ui/react";
import styles from "../styles/Home.module.css";
import Channel from "../components/Landing/channel";
import Footer from "../components/Footer";

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
                <Channel />
                <Footer />
            </Box>
        </Layout>
    );
}
