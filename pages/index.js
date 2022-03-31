import { HeroSection, Features, Team } from "../components/Landing";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import Channel from "../components/Landing/channel";
import Footer from "../components/Footer";
import { Box } from "@chakra-ui/react";
import { ApolloProvider, ApolloClient,HttpLink, InMemoryCache } from '@apollo/client';

// Replace with our near-testnet/graphql
const tetsnet = 'https://mintbase-testnet.hasura.app/v1/graphql'
///const mainnet = https://mintbase-mainnet.hasura.app/v1/graphql
    const client = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: tetsnet,
      credentials: 'same-origin',
      headers: {
        'x-hasura-role': 'anonymous',
      },
    }),
    cache: new InMemoryCache(),
  })



export default function Home() {
    return (
        <ApolloProvider client={client}>
        <Layout>
            <Box className="flex flex-col">
                <HeroSection />
                <Features />
                <Team />
                <Channel />
                <Footer />
            </Box>
        </Layout>
        </ApolloProvider>
    );
}
