import { useState } from "react";
import NFTCard from "./NFTCard";
import ReactCardFlip from "react-card-flip";
import Exchange from "../Exchange";
import { NearStoreType } from "../../../types/stores";
import {
    Box,
    Flex,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from "@chakra-ui/react";
import LiquidityPool from "../LiquidityPool";
import { HEIGHT, WIDTH } from "@/utils/styles";

export type SideBarProps = {
    bg: string;
    nearState: NearStoreType;
};

const SideBar = ({ bg, nearState }: SideBarProps) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const flip = () => setIsFlipped(!isFlipped);

    // To switch Send and Exchange component on the back side of flip
    const [toSend, setToSend] = useState(true);

    return (
        <ReactCardFlip isFlipped={isFlipped}>
            <NFTCard
                profile={nearState?.profile}
                balance={nearState?.aexBalance}
                bg={bg}
                flip={flip}
                setToSend={setToSend}
            />
            {toSend ? (
                // TODO: switch to Send Component
                <Exchange balance={100} flip={flip} bg={bg} />
            ) : (
                <Flex
                    justifyContent={"space-between"}
                    direction={"column"}
                    bg={bg}
                    h={HEIGHT.sidebar}
                    w={WIDTH.sidebar}
                    py={7}
                    px={2}
                    rounded={"md"}
                >
                    <Tabs variant="soft-rounded" colorScheme="green">
                        <TabList justifyContent={"center"}>
                            <Tab>Exchange</Tab>
                            <Tab>Liquidity Pool</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Exchange balance={100} flip={flip} bg={bg} />
                            </TabPanel>
                            <TabPanel>
                                <LiquidityPool
                                    balance={100}
                                    flip={flip}
                                    bg={bg}
                                />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Flex>
            )}
        </ReactCardFlip>
    );
};

export default SideBar;
