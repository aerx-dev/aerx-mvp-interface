import { HEIGHT, WIDTH } from "@/utils/styles";
import {
    Box,
    HStack,
    Heading,
    Text,
    useColorModeValue,
    Hide,
    Show,
    Tag,
} from "@chakra-ui/react";
import { AddIconButton } from "../../UI/IconButton";

const Collections = ({ collapse, ...rest }: { collapse: any }) => {
    const toggle = () => {
        collapse[1](!collapse[0]);
    };
    const bg = useColorModeValue("gray.100", "lightblack");
    const styles = {
        div1: {
            background: "url('/images/1/1.jpg')",
        },
        div2: {
            background: "url('/images/1/2.jpg')",
        },
        div3: {
            background: "url('/images/1/3.jpg')",
        },
        div4: {
            background: "url('/images/1/4.jpg')",
        },
    };

    const collections = [
        {
            name: "Music",
            count: 345,
        },
        {
            name: "Memes",
            count: 95,
        },
        {
            name: "Art",
            count: 89,
        },
        {
            name: "Pop",
            count: 63,
        },
        {
            name: "Music",
            count: 345,
        },
        {
            name: "Memes",
            count: 95,
        },
        {
            name: "Art",
            count: 89,
        },
        {
            name: "Pop",
            count: 63,
        },
        {
            name: "Music",
            count: 345,
        },
        {
            name: "Memes",
            count: 95,
        },
        {
            name: "Art",
            count: 89,
        },
        {
            name: "Pop",
            count: 63,
        },
    ];

    return (
        <Box
            className="flex flex-col w-full sticky top-20 rounded-md py-4"
            bgColor={bg}
            w={WIDTH.sidebar}
            maxH={HEIGHT.sidebar}
        >
            <HStack className="flex justify-between mr-4">
                <Hide below="lg">
                    <Heading size="lg" ml={3}>
                        Collections
                    </Heading>
                    <AddIconButton />
                </Hide>
                <Show below="lg">
                    <Heading size="md" ml={3}>
                        Collections
                    </Heading>
                    <AddIconButton />
                </Show>
            </HStack>

            <div className="mt-3 dippyscroll">
                {collections.map((item, index) => (
                    <div
                        key={item.name + index}
                        className="flex flex-row relative"
                    >
                        <div className="flex flex-row relative items-center h-32 w-full m-1 z-10 justify-start">
                            <Text className=" absolute top-5 left-5">
                                {item.name}
                            </Text>
                            <Tag
                                size="xs"
                                variant="solid"
                                borderRadius={15}
                                px={1.5}
                                py={0.5}
                                bg="#6054F0"
                                color="invert(bg)"
                                className="absolute left-5"
                            >
                                +{item.count}
                            </Tag>
                        </div>
                        <div
                            className={`flex flex-col absolute shadow-lg h-32 w-11/12 m-3 rounded-lg bg-cover`}
                            style={styles.div4}
                        ></div>
                        <div
                            className={`flex flex-col absolute shadow-lg h-32 w-10/12 m-3 rounded-lg bg-cover`}
                            style={styles.div3}
                        ></div>
                        <div
                            className={`flex flex-col absolute shadow-lg h-32 w-9/12 m-3 rounded-lg bg-cover`}
                            style={styles.div2}
                        ></div>
                        <div
                            className={`flex flex-col absolute shadow-lg h-32 w-8/12 m-3 rounded-lg bg-cover`}
                            style={styles.div1}
                        ></div>
                    </div>
                ))}
            </div>
        </Box>
    );
};

export default Collections;
