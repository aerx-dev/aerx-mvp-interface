import React from 'react'
import {
  Box,
  Button,
  Image,
  Text,
  Heading,
  Container,
  FormControl,
  Input
} from "@chakra-ui/react";

import WithStar from "../Hero/WithStars";
import WithDots from "../Hero/WithDots";



type Images = {
    saly1:string
    saly2:string
    frame1:string
    frame2:string
    frame3:string
    star:string
}

const NewsLetterForm: React.FC<Images> = (props:Images) => {
  return (
    <WithStar>
        <WithDots>
    <Box className='form'>
        <Image width='185px' src={props.saly2} className='saly2-b'/>
        <Container maxWidth="container.xlg">
        <Box display='flex' alignItems="center" py="20" flexDirection="row" marginRight='95px' marginLeft="95px">
            <Box ml={0} width={615} mr={4} >
                <Image width='285px' src={props.saly1} className='saly1-b'/>
            </Box>

            <Box width={695}>
                    <Heading fontSize='6xl' color='#322E65'>
                    Be part of the team
                    </Heading>
                    <Box display="flex" flexDirection='row'>
                        <Image  src={props.star} mr={2}/>
                    <Text 
                    className='easily'
                    >
                       Right now
                    </Text>
                    </Box>
                    <Text 
                     fontSize='2xl'
                     fontStyle='normal'
                     lineHeight={1.5}
                     fontWeight='300'
                     justifyContent='left'
                     marginRight={13}
                     mt={35}
                     mb={35}
                     color="#322E6580"
                    >
                    Kindly subscribe to our email news letter to get amazing information.

                    </Text>
                    <FormControl>
                        <Input
                        placeholder="Enter your mail"
                        type="text"
                        width='50%'
                        borderRadius='25'
                        py={6}
                        borderColor="8E8E8E"
                        >
                        
                        </Input>
                        <Button bgColor='#8D00FF' borderRadius='100%' color='white' mt={5} className='inner' marginTop="-5px" marginLeft="-48px">
                            <Image width={3} height={3} src={props.frame3} />
                        </Button>
                        <Box display='flex' flexDirection='row' mt={35} mb={55}>
                            <Image src={props.frame1} mr={6}/>
                            <Image src={props.frame2}/>
                        </Box>
                    </FormControl>
                </Box>
              
        </Box>
        </Container>
    </Box>
    </WithDots>
    </WithStar>
  )
}
export default NewsLetterForm;