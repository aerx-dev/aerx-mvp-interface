import React, { ChangeEvent } from "react";
import { useState, useEffect } from "react";

import { Box, Flex, Button, Text, useColorMode, Input } from "@chakra-ui/react";
import { AddIconButton } from "@/components/UI/IconButton";
import CreatePool from "./CreatePool";
import AddLiquidity from "./addLiquidity";
import { nearStore } from "@/stores/near";
import MyPool from "./myPool";
import CustomInput from "@/components/UI/Inputs/CustomInput";

// TODO: remove once fetching data properly
const DUMMY_MY_POOL: PoolType[] = [
    {
        pair: "AEX-NEAR",
        fee: 0.3,
        tvl: 3.6,
        pools: 197,
    },
    {
        pair: "NEAR-AEX",
        fee: 0.3,
        tvl: 3.6,
        pools: 197,
    },
];
const DUMMY_TOP_POOL: PoolType[] = [
    {
        pair: "NEAR-AEX",
        fee: 0.3,
        tvl: 3.6,
        pools: 197,
    },
    {
        pair: "NEAR-ETH",
        fee: 0.3,
        tvl: 3.6,
        pools: 197,
    },
    {
        pair: "NEAR-BTC",
        fee: 0.3,
        tvl: 3.6,
        pools: 197,
    },
    {
        pair: "NEAR-AEX",
        fee: 0.3,
        tvl: 3.6,
        pools: 197,
    },
];

export type LiquidityPoolProps = {};

export type PoolType = {
    pair: string;
    fee: number;
    tvl: number;
    pools: number;
};

const LiquidityPool: React.VFC<LiquidityPoolProps> = () => {
    const { colorMode } = useColorMode();

    const nearState = nearStore((state) => state);
    const [searchInput, setSearchInput] = useState("");

    const [myPools, setMyPools] = useState<PoolType[]>([]);
    const [topPools, setTopPools] = useState<PoolType[]>([]);
    const [targetPool, setTargetPool] = useState("");

    const [isOpenCreatePool, setIsOpenCreatePool] = useState(false);
    const [isOpenAddLiquidity, setIsOpenAddLiquidity] = useState(false);

    useEffect(() => {
        const load = async () => {
            // TODO: call method to fetch my pool data
            setMyPools(DUMMY_MY_POOL);
            setTopPools(DUMMY_TOP_POOL);
        };
        load();
    }, []);

    useEffect(() => {
        if (!searchInput) {
            //  TODO: should set the default top pools
            setTopPools(DUMMY_TOP_POOL);
            return;
        }
    }, [searchInput]);

    const handlePoolClick = (pair: string) => {
        setTargetPool(pair);
        openAddLiquidity();
    };

    const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    };

    const openCreatePool = () => {
        setIsOpenCreatePool(true);
    };
    const closeCreatePool = () => {
        setIsOpenCreatePool(false);
    };

    const openAddLiquidity = () => {
        setIsOpenAddLiquidity(true);
    };
    const closeAddLiquidity = () => {
        setIsOpenAddLiquidity(false);
    };

    return (
        <Box w={"100%"}>
            {isOpenCreatePool && <CreatePool handleClose={closeCreatePool} />}
            {isOpenAddLiquidity && (
                <AddLiquidity
                    handleClose={closeAddLiquidity}
                    targetPool={targetPool}
                />
            )}

            {!isOpenCreatePool && !isOpenAddLiquidity && (
                <Flex flexDir={"column"}>
                    <Flex>
                        <CustomInput
                            placeholder="Search by pair name"
                            value={searchInput}
                            handleChange={handleSearchInput}
                        />
                    </Flex>
                    <Box pb={6} pos={"relative"}>
                        <Text fontSize="sm" color={"gray"} textAlign={"center"}>
                            My Pools
                        </Text>
                        <Box
                            onClick={openCreatePool}
                            ml={3}
                            pos={"absolute"}
                            top={0}
                            right={0}
                        >
                            <AddIconButton />
                        </Box>
                        <MyPool pools={myPools} handleClick={handlePoolClick} />
                    </Box>
                    <Box pb={6} pos={"relative"}>
                        <Text fontSize="sm" color={"gray"} textAlign={"center"}>
                            Top Pools
                        </Text>
                        <MyPool
                            pools={
                                searchInput
                                    ? topPools.filter(({ pair }) =>
                                          pair.includes(searchInput),
                                      )
                                    : topPools
                            }
                            handleClick={handlePoolClick}
                        />
                    </Box>
                    <Button colorScheme={"blue"} onClick={openAddLiquidity}>
                        Add liquidity
                    </Button>
                </Flex>
            )}
        </Box>
    );
};

export default LiquidityPool;
