import Head from 'next/head'
import {
  HeroSection,
  EmailCapture,
  Features,
  Team,
} from "../components/Landing";
import Layout from "../components/Layout";
import { Box } from "@chakra-ui/react";
import Image from 'next/image'
import { useState } from 'react'
import IpfsComponent from '../components/ipfs'
import styles from '../styles/Home.module.css'

export default function Home() {

  // tracks teh state of the selected upload file from the input button.
  const [state, setState] = useState(null)

  function handleChange(event) {
    setState(() => event.target.files[0])
  }

  <Head>
    {/* Primary Meta Tags */}
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    {/* <IpfsComponent></IpfsComponent> */}
  </Head>;

  return (
    <Layout>
      <div>
        <div>
          <input type="file" res="state" onChange={handleChange} />
        </div>
        <IpfsComponent state={state} />
      </div>
      <Box className="flex flex-col">
        <HeroSection />
        <Features />
        <Team />
        <EmailCapture />
      </Box>

    </Layout>



  )
}
