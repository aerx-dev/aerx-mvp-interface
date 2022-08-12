import React from 'react'
import {
  Image,
  Heading,
  Center,
  Container,
  Button
} from "@chakra-ui/react";
import WithStar from "../Hero/WithStars";
import WithDots from "../Hero/WithDots";

type Images = {
    frame:string
    polygon:string
}

const SectionTwo: React.FC<Images> = (props:Images) => {
    return (
            <WithStar>
            <WithDots>
            <Container maxWidth="container.xlg">
                
            <Center py={21}>
                <Heading  color='#322E65' fontSize='6xl' fontWeight='600px' >
               About project
                </Heading>  
            </Center>
            <Center>
                <Button margin="auto" position="absolute" bgColor="#8D00FF;
">
                    <Image width={12} src={props.polygon} />
                </Button>
                    <Image src={props.frame}/>
            </Center>
            </Container >
            </WithDots>
            </WithStar>
        
        

    )
}

export default SectionTwo;