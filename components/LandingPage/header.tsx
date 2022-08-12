import React from 'react'
import {
  Box,
  Button,
  Image,
  Text,
  Container
} from "@chakra-ui/react";


type Images = {
  logo:string
}
const Header: React.FC<Images> = (props:Images) => {
  return (
    
      <Container maxWidth="1921px">
          <Box
           display="flex"
           alignItems="center"
           justifyContent="space-between"
           paddingRight='95px'
           paddingLeft='95px'
           mt={6}
          >
            <Box>
              <Image src={props.logo} alt="logo" />
            </Box>
            <Box display="flex" marginLeft='-625px'>
            <Text fontSize='md'mr={4} mt={2}>Home</Text>
            <Text fontSize='md'mr={4} mt={2}>Features</Text>
            <Text fontSize='md'mr={4} mt={2}>About us</Text>
            </Box>
            <Box display="flex">
              <Text fontSize='md'mr={4} mt={2}>Register</Text>
              <Button bgColor='#8D00FF' borderRadius={50} color='white'>
                Login
              </Button>
            </Box>
          </Box>
       </Container>

  )
}

export default Header;