import { HeroSection, Features, Team } from "../components/Landing";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import Channel from "../components/Landing/channel";
import Footer from "../components/Footer";
import { Box } from "@chakra-ui/react";

export default function Home() {
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
