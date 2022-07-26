import React, { ReactNode } from "react";
import NEAR_LOGO from "@/public/near.svg";
import AERX_LOGO from "@/public/aerx.svg";
import { Grid, GridItem, Icon, Text } from "@chakra-ui/react";
import { PoolType } from ".";
import { ExchangeCurrencyType } from "@/types/exchange";

export type PoolItemProps = PoolType & {
    handleClick: (pair: string) => void;
};

const PoolItem = ({ pair, fee, tvl, pools, handleClick }: PoolItemProps) => {
    const [base, quote] = pair.split("-");

    return (
        <Grid
            templateColumns="repeat(2, 1fr)"
            gridTemplateRows={"1fr"}
            gap={2}
            width={"100%"}
            borderBottom={"1px"}
            borderColor={"#131414"}
            alignItems={"center"}
            _hover={{ cursor: "pointer" }}
            onClick={() => handleClick(pair)}
        >
            <Grid
                templateColumns="repeat(5, 1fr)"
                gridTemplateRows={"1fr"}
                gap={0}
            >
                <CustomGridItem colSpan={1}>
                    {/* TODO: change icon dynamically */}
                    <TokenIcon token={base as ExchangeCurrencyType} />
                </CustomGridItem>
                <CustomGridItem colSpan={1}>
                    {/* TODO: change icon dynamically */}
                    <TokenIcon token={quote as ExchangeCurrencyType} />
                </CustomGridItem>
                <CustomGridItem colSpan={3}>
                    <Text fontSize={"sm"} pl={1}>
                        {pair}
                    </Text>
                </CustomGridItem>
            </Grid>
            <Grid
                templateColumns="repeat(3, 1fr)"
                gridTemplateRows={"1fr"}
                gap={0}
            >
                <CustomGridItem colSpan={1}>
                    <Text fontSize={"sm"}>{fee}%</Text>
                </CustomGridItem>
                <CustomGridItem colSpan={1}>
                    <Text fontSize={"sm"}>${tvl}</Text>
                </CustomGridItem>
                <CustomGridItem colSpan={1}>
                    <Text fontSize={"sm"}>{pools}</Text>
                </CustomGridItem>
            </Grid>
        </Grid>
    );
};

const CustomGridItem = ({
    h = "12",
    colSpan,
    children,
}: {
    h?: string;
    colSpan: number;
    children: ReactNode;
}) => (
    <GridItem h={h} display={"flex"} colSpan={colSpan} alignItems={"center"}>
        {children}
    </GridItem>
);
const TokenIcon = ({ token }: { token: ExchangeCurrencyType }) =>
    token === "AEX" ? <AERX_LOGO /> : <NEAR_LOGO />;

export default PoolItem;
