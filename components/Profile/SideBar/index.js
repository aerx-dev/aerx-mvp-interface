import { Layout } from "antd";
import { CopyButton, HeartIcon , NotificationIcon } from "../../UI/IconButton";
import { SendButton , FollowButton } from "../../UI/Buttons";
import {
    Box,
    Divider,
    Flex,
    HStack,
    Icon,
    Text,
    Tag,
    useColorMode,
    useColorModeValue,
    Heading,
    useClipboard,
    VStack,
} from "@chakra-ui/react";
import { useState, createElement } from "react";
import Collections from "../Collections";
import BalanceBar from "./balanceBar";
import { nearStore } from "../../../stores/near";

const { Header, Sider, Content, Footer } = Layout;

/**
 * @global use relative|viewport sizing for width and height
 * eg vh && vw over px, worstcase use rem...
 * always define height and width in percentages %
 */

export default function SideBar({ children, bg, state }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { colorMode } = useColorMode();
    const filter = colorMode === "light" ? "invert(1)" : "invert(0)";

    
    console.log(state);

    return (
	<div>
        <div className="grid grid-cols-12 gap-x-10 mx-10 dippy sm:dippy md:griddy">																																																																																																																																		<div
                className="col-start-1 col-span-3 flex flex-col items-center min-h-full"
                trigger={null}
            >    
            <RightSide
                    profile={state?.profile}
                    balance={state?.aexBalance}
                    bg={bg}
                    className="sticky top-20 min-h-max min-w-full"
                />
                
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
	</div>
    );
}

const RightSide = ({ profile, balance, ...rest }) => {
    const value = "0jx12hbuwc34jcsuhwoc" ;
    const { hasCopied, onCopy } = useClipboard(value);
    console.log(balance);
    const picBg = useColorModeValue("white", "gray.300");
    const bgGradient = useColorModeValue(
        "linear(#edf2f700, #edf2f720 15%, gray.100 90%)",
        "linear(#1E202100, #1E202100 15%, lightblack 90%)",
    );
    const tags = ["#crypto", "#eth", "#near", "#aerx"]; 

    return (
        <Box className="border-1 fixed max-h-screen " {...rest}>
            <Flex className="align-middle justify-between" direction="column">
                <Box
                    className="rounded-t-lg w-full relative "
                    height="45vh"
                    bg={picBg}
                    bgImage={profile?.profileImg || "/images/pavel.png"}
                    position="relative"
                    bgSize="cover"
                    bgRepeat="no-repeat"
                    bgPosition="center"
                >
                    <Box ml="70%">
                        <HeartIcon mr="-3.5"/>
                        <NotificationIcon />
                    </Box>
                    <Box
                        className="z-10 absolute bottom-0 h-2/5 w-full px-2 text-white"
                        bgGradient={bgGradient}
                        fontFamily="Open Sans"
                    >
                        <Text
                            className="h-1/4 mb-2"
                            fontWeight="bold"
                            fontSize="2xl"
                        >
                            {profile?.fullName || "Pavel Dantsev"}
                        </Text>
                        <Text sx={styles} fontWeight="medium">
                            @{profile?.username || "pashq.aerx"}
                        </Text>
                        <RSideBarIters iterType="tags" data={tags} {...rest} />
                        <HStack className="bottom-0 gap-x-2 my-2" >
                            <Box ml={2}><SendButton/></Box>
                            <Box><FollowButton /></Box>  
                        </HStack>
                        
                    </Box>
                </Box>
                <HStack m={3} justifyContent="left">
                    <Text> {value} </Text>
                    <Box onClick={onCopy}><CopyButton /></Box>
                </HStack>
                
                <Box className="text-left px-4 mb-5" sx={styles}>
                    <Text className="opacity-50 mb-3">ABOUT</Text>
                    <Text>
                        {profile?.aboutMe ||
                            `I work as a doctor, but in my free time I like to make
                        funny pictures and videos. See more details in my
                        collection.`}
                    </Text>
                    <Text className="opacity-50 mb-2 mt-2 ">HOBBIES</Text>
                    <Text className="text-sm">
                        {profile?.hobbys ||
                            `Hobbies, what's that?!`}
                    </Text>
                </Box>
                <Divider />
                <BalanceBar balance={balance} />
            </Flex>
        </Box>
    );
};
const RSideBarIters = ({ iterType, data, ...rest }) => {
    return (
        <HStack
            spacing={1}
            my={2}
            sx={styles}
            justifyContent="left"
            alignItems="center"
            w="100%"
        >
            {/* profile.tags */}
            {data.map((iter) =>
                iterType === "tags" ? (
                    <Tag
                        size="xs"
                        key={iter}
                        variant="solid"
                        borderRadius={15}
                        px={1}
                        py={0.5}
                        as="i"
                        bg="transparent"
                        color="invert(bg)"
                    >
                        {iter}
                    </Tag>
                    ) : null
                    )}
                </HStack>
            );
        };

// const RSideBarBalance = ({ balance, ...rest }) => {
//     return (
//         <Box
//                 bgImage="/images/balance-bg.svg"
//                 bgColor="#ffff0006"
//                 bgPos="center"
//                 bgSize="cover"
//                 bgBlendMode="darken"
//                 borderRadius="lg"
//                 w="100%"
//                 py={3}
//                 >
//             <VStack
//                className="content-align-left px-4" 
//             >   
//                 <Text className="font-semibold" >Your Balance</Text>
//                 <HStack>
//                     <Icon color="yellow" as={ThunderboltFilled} />
//                     <Heading size="md">{balance || 0}</Heading>
//                 </HStack>
//                 <HStack>
//                     <SendIconButton />
//                     <ReceiveIconButton />
//                 </HStack>
//             </VStack>
//         </Box>
//     );
// };

const styles = {
    fontFamily: "Open Sans",
    fontSize: 12,
};
