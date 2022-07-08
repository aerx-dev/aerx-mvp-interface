import {
    Box,
    Divider,
    Flex,
    HStack,
    Text,
    useColorModeValue,
    useClipboard,
} from "@chakra-ui/react";
import { Layout } from "antd";
import { useState } from "react";
import Collections from "../Collections";
import NFTCard from "./NFTCard";
import ReactCardFlip from "react-card-flip";

const { Header, Sider, Content, Footer } = Layout;

export default function SideBar({ children, bg, state }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    console.log("state", state);
    const [isFlipped, setIsFlipped] = useState(false);
    const handleClick = () => setIsFlipped(!isFlipped);

    return (
        <div>
            <div className="grid grid-cols-12 gap-x-10 mx-10 dippy dippycontent sm:dippy md:griddy">
                {" "}
                <div
                    className="col-start-1 col-span-3 flex flex-col items-center min-h-full"
                    trigger={null}
                >
                        <ReactCardFlip isFlipped={isFlipped}>
        <Flex
          flexDir='column'
          justifyContent='space-between'
          alignItems='center'
          minH='inherit'
          mb={50}
        >
          <Text color='teal.100' overflowWrap='anywhere' padding={5}>
            {card.front}
          </Text>

          <Button colorScheme='white' onClick={handleClick}>
            {isFlipped ? 'See description' : 'See answer'}
          </Button>
        </Flex>
        <Flex
          flexDir='column'
          justifyContent='space-between'
          alignItems='center'
          minH='inherit'
          mb={50}
        >
          <Text color='teal.100' padding={5}>
            {card.back}
          </Text>

          <Button colorScheme='white' onClick={handleClick}>
            {isFlipped ? 'See description' : 'See answer'}
          </Button>
        </Flex>
    </ReactCardFlip>
                </div>
                <div className="col-start-4 col-span-6 flex flex-col items-center">
                    <Content className="min-w-full">{children}</Content>
                </div>
                <div className="col-start-10 col-span-3 flex flex-col items-center">
                    <Collections
                        collapse={[isCollapsed, setIsCollapsed]}
                        className="min-w-full"
                    />
                </div>
            </div>
            <div className="items-center md:dippy">
                <Content className="min-w-full">{children}</Content>
            </div>
        </div>
    );
}
