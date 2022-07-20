import { Box, Flex, VStack, Text, Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import { PoolType } from ".";
import PoolItem from "./poolItem";

type MyPoolProps = {
    pools: PoolType[];
    handleClick: (pair: string) => void;
};

const MyPool = ({ pools, handleClick }: MyPoolProps) => {
    return (
        <VStack px={0} pt={2}>
            <MyPoolHeading />
            {pools.map((pool, idx) => (
                <PoolItem
                    key={pool.pair + idx}
                    handleClick={handleClick}
                    {...{ ...pool }}
                />
            ))}
        </VStack>
    );
};

const MyPoolHeading = () => (
    <Grid
        templateColumns="repeat(2, 1fr)"
        gridTemplateRows={"1fr"}
        gap={2}
        width={"100%"}
    >
        <Grid templateColumns="repeat(4, 1fr)" gridTemplateRows={"1fr"} gap={0}>
            <GridItem colSpan={1}>
                <HeadingText text={"Pair"} />
            </GridItem>
            <GridItem colSpan={1}></GridItem>
            <GridItem colSpan={2}></GridItem>
        </Grid>
        <Grid templateColumns="repeat(3, 1fr)" gridTemplateRows={"1fr"} gap={0}>
            <GridItem colSpan={1}>
                <HeadingText text={"Fee"} />
            </GridItem>
            <GridItem colSpan={1}>
                <HeadingText text={"TVL"} />
            </GridItem>
            <GridItem colSpan={1}>
                <HeadingText text={"Pools"} />
            </GridItem>
        </Grid>
    </Grid>
);

const HeadingText = ({ text }: { text: string }) => (
    <Text fontSize={"sm"} color={"gray"}>
        {text}
    </Text>
);

export default MyPool;
