import { HeroSection, Features, Team } from "../components/Landing";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import Channel from "../components/Landing/channel";
import Footer from "../components/Footer";
import { Box } from "@chakra-ui/react";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export default function Home({ nftDetails }) {
  console.log("nftDetails", nftDetails)
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

export async function getStaticProps() {
  const client = new ApolloClient({
    // Replace with our near-testnet/graphql
    uri: 'https://api.path_to_aerx_near-testnet/graphql/',
    cache: new InMemoryCache()
  });

  // This is an example query, we need the actual data struct stored on the NEAR testnet
  // to build the query
  const { data } = await client.query({
    query: gql`
    
      query GetNFTs {
        mintedNFTs(limit: 10) {
          id
          name
          owner
          minter
          date
          claimed {
            id
            name
          }
        }
      }
    `
  });

  console.log("data", data);

  //With this we retrieve the details of the NFT and can display it to the user
  return {
    props: {
      nftDetails: data.mintedNFTs
    }
  }
}

