import React from 'react'
import {
  Box,
  Image,
  Text,
  Heading,
  Container,
} from "@chakra-ui/react";

type Images = {
    saly3:string,
    saly4:string,
    fly1:string,
    fly2:string,
    fly3:string,
    star:string

}

const SectionTwo: React.FC<Images> = (props:Images) => {
    return (
        <Box>
            <Container maxWidth="container.xlg">
            <Box display='flex' alignItems="center" py="20" flexDirection="row" marginRight='95px' marginLeft="95px">
               
                <Box width={739} className='earn-more'>
                    <Heading fontSize='6xl' color='#322E65'>
                    Earn more
                    </Heading>
                    <Box display="flex" flexDirection='row'>
                        <Image  src={props.star} mr={2}/>
                    <Text 
                    className='together'
                    >
                       Together
                    </Text>
                    </Box>
                    <Text  fontSize='2xl'
                     fontStyle='normal'
                     lineHeight={1.5}
                     fontWeight='300'
                     justifyContent='left'
                     marginRight={13}
                     mt={35}
                     color="#322E6580">
                    You can create combined posts with other authors and earn money on it together
                    </Text>
                    <Text
                       fontSize='2xl'
                       fontStyle='normal'
                       lineHeight={1.5}
                       fontWeight='300'
                       justifyContent='left'
                       marginRight={13}
                       mt={35}
                       color="#322E6580"
                    >
                    Some blogger decides to use for his post a picture that another user drew, and is ready to pay him a little for it.
It turns out a win = a
                    </Text>
                </Box>
                <Box ml={0} width={585} mr={4} position='relative'>
                    <Image width={185} src={props.fly1} position='absolute' className='fly1'/>
                    <Image  src={props.fly2} position='absolute' className='fly2'/>
                    <Image width={92} src={props.fly3} position='absolute' className='fly3'/>
                    <Image width={285} src={props.saly3} position='absolute' className='saly1'/>
                    <Image width={285} src={props.saly4} position='absolute' className='saly2'/>
                </Box>
                
            </Box>
            </Container >
        </Box>
        
        

    )
}

export default SectionTwo;