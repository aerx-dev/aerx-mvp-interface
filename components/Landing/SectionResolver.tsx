import {
    Box,
    Flex,
    Grid,
    GridItem,
    Heading,
    Image as CustomImage,
    Text,
} from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/system";
import Image from "next/image";
import { ReactNode } from "react";

export type CustomHeadingProps = {
    children?: ReactNode;
    isCenter?: boolean;
    styled?: any;
    colorMode?: any;
};

const CustomHeading = ({
    children,
    isCenter,
    styled,
    colorMode,
}: CustomHeadingProps) => {
    return (
        <Heading
            fontWeight={"bold"}
            mb={4}
            fontSize={["5xl", ""]}
            colorScheme={colorMode === "light" ? "#322E65" : "#000"}
        >
            {children}
            <Flex
                className="heading-italic"
                justifyContent={
                    isCenter ? ["center", "center", "flex-start"] : []
                }
                alignItems="center"
                gap={2}
                as="i"
                fontSize="4rem"
                fontWeight="extrabold"
                color="#8D00FF"
            >
                <Image
                    src="/star.svg"
                    alt={"star picture"}
                    width={50}
                    height={50}
                />
                {styled}
            </Flex>
        </Heading>
    );
};

export type SectionResolverProps = {
    children: any;
    image: any;
    rtl: any;
    heading: any;
    styledHeading: any;
    body: string[];
    imgSpan: any;
    bodySpan: any;
    overflow: any;
    paddingTop: any;
};
const SectionResolver = ({
    children,
    image,
    rtl,
    heading,
    styledHeading,
    body,
    overflow,
    paddingTop,
}: SectionResolverProps) => {
    const options = {
        imgOrder: rtl && [1, 1, 2],
        textOrder: rtl && [2, 2, 1],
    };
    const { colorMode } = useColorMode();

    return (
        <Grid
            paddingTop={paddingTop}
            overflow={overflow}
            templateColumns="repeat(2, 1fr)"
            textAlign={["center", "center", "left"]}
        >
            <GridItem position="relative" order={options.imgOrder} colSpan={1}>
                <Box
                    display={rtl ? "none" : "block"}
                    style={{
                        transform: `rotate(${rtl ? 180 : 0}deg)`,
                    }}
                    position={"absolute"}
                    left={-200}
                    top={0}
                >
                    <CustomImage src="/blue.png" fit="fill" />
                </Box>
                <Box>
                    <CustomImage
                        style={{
                            maxHeight: 500,
                        }}
                        src={image}
                        alt={heading}
                    />
                </Box>
            </GridItem>
            <GridItem
                maxW="auto"
                order={options.textOrder}
                colSpan={1}
                padding={10}
                marginTop={25}
            >
                <CustomHeading isCenter styled={styledHeading}>
                    {heading}
                </CustomHeading>
                <Flex fontSize={[18, 20]} flexDirection="column" gap={2}>
                    {body?.map((text, i) => (
                        <Text
                            key={text + i}
                            colorScheme={
                                colorMode === "light" ? "#322E65" : "#000"
                            }
                            opacity={0.7}
                        >
                            {text}
                        </Text>
                    ))}
                </Flex>

                {children}
            </GridItem>
        </Grid>
    );
};

export default SectionResolver;
