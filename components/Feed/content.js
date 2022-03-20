import {
    Box,
    Heading,
    useColorModeValue,
    Grid,
    Text,
    Button,
    Image as ChakraImage,
} from "@chakra-ui/react";
import { AiOutlineThunderbolt } from "react-icons/ai";



export default function Content(props) {

    const picBg = useColorModeValue("gray.200", "gray.700");
    const postBg = useColorModeValue("gray.50", "gray.900");
    const imageBg = useColorModeValue("#fafafa", "#0a0a0a");

    function getCharge(tokenId) {
        // call contract and get charge
        const eleven = 111
        return eleven
    }

    return (
        <Box
            // key={props.cnft.token_id + "pro"}
            bg={postBg}
            rounded="lg"
            borderWidth={2}
            mb={4}
        >
            <Box
                borderBottom={2}
                p={4}
                display="flex"
                alignContent={"center"}
                gap={2}
            >
                <Box
                    display="inline-block"
                    height="40px"
                    width="40px"
                    bg="gray.500"
                    rounded="full"
                ></Box>

                <Box fontSize="lg" pt={1}>
                    {/* {props.cnft.owner_id} */}
                </Box>
            </Box>
            {props.cnft.metadata.media && 
                <ChakraImage
                    bg={imageBg}
                    height="320px"
                    rounded="lg"
                    maxWidth={["100%", "400px", "225px"]}
                    margin="0 auto"
                    src={props.cnft.metadata.media}
                    alt={"contentNftmedia" + props.cnft.token_id}
                    objectFit="cover"
                />
            }
            < Box px={4} >
                {props.cnft.metadata.description}
            </Box >
            <Box borderTop={2} p={4}>
                <AiOutlineThunderbolt
                    style={{ display: "inline" }}
                />{" " + getCharge(props.cnft.token_id)}
            </Box>
        </Box >
    );
}
