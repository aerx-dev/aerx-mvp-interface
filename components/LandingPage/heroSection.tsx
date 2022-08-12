import React from 'react'
import {
  Box,
  Button,
  Image,
  Text,
  Heading,
  Container
} from "@chakra-ui/react";
import WithStar from "../Hero/WithStars";
import WithDots from "../Hero/WithDots";


type Images = {
  saly:string
  group1:string
}
const HeroSection: React.FC<Images> = (props:Images) => {
  return (

<WithStar>
    <Box>
      <Container maxWidth="container.xlg">
        <Box display='flex' alignItems="center" py="20" flexDirection="row" marginRight='95px' marginLeft="95px"
  >
         <Box width={615}>
          <Heading fontSize='6xl' color='#322E65'>
            <Box>Welcome to  Aerx</Box>
          </Heading>
          <Text 
        fontSize='xl'
        fontStyle='italic'
        fontWeight={300}
        fontFamily='Poppins'
        color='#322E65CC;
        '
        my={3}
        >web3.0 media social platform
        </Text>
        <Text 
        fontSize='2xl'
        fontStyle='normal'
        lineHeight={2}
        fontWeight='300'
        justifyContent='left'
        marginRight={13}
        mt={35}
        color="#322E6580"
        >
         Aerx is a web 3 social media platform with a fundamentally new approach to monetization of user content
        </Text>
        <Button bgColor='#8D00FF' borderRadius={50} color='white' mt={4} >
                 Get started
         </Button>
         </Box>
         <WithDots>
          <Box marginLeft='125px'>
            <Image width='100' src={props.group1} position="absolute" className='group1-a'/>
            <Image width='100' src={props.saly}/>
          </Box>
          </WithDots>

        </Box>
      </Container>
    </Box>
</WithStar>



 
  )
}
export default HeroSection;