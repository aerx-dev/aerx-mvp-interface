import {
    Box,
    Flex,
    Grid,
    GridItem,
    Image as CustomImage,
    Heading as CustomHeading,
    Text
} from "@chakra-ui/react";

const SectionResolver = ({
    children,
    image,
    rtl,
    heading,
    styledHeading,
    body,
    imgSpan,
    bodySpan,
    overflow,
}) => {
    const options = {
        imgOrder: rtl && [1, 1, 2],
        textOrder: rtl && [2, 2, 1],
    };
    return (
        <Grid
            overflow={overflow}
            py={[4, 8, 10]}
            textAlign={["center", "center", "left"]}
        >
            <GridItem
                position="relative"
                order={options.imgOrder}
                colSpan={imgSpan ?? [12, 12, 6]}
            >
                <Box
                    display={rtl ? "none" : "block"}
                    style={{
                        transform: `rotate(${rtl ? 180 : 0}deg)`,
                    }}
                    position={"absolute"}
                    left={-200}
                    top={0}
                >
                    <CustomImage
                        src="/blue.png"
                        width={600}
                        height={600}
                    />flex flex-col
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
                maxW="500px"
                order={options.textOrder}
                colSpan={bodySpan ?? [12, 12, 6]}
            >
                <CustomHeading isCenter styled={styledHeading}>
                    {heading}
                </CustomHeading>
                <Flex fontSize={[18, 20]} flexDirection="column" gap={2}>
                    {body.map((text, i) => (
                        <Text key={i}>{text}</Text>
                    ))}
                </Flex>

                {children}
            </GridItem>
        </Grid>
    );
};

export default SectionResolver;
