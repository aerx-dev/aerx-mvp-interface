import { Layout } from "antd";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    ThunderboltFilled,
} from "@ant-design/icons";
import {RiSendPlaneFill} from "react-icons/ri";
import { MdOutlineDone , MdCopyAll} from "react-icons/md";
import {IoNotificationsOutline, IoHeartOutline} from "react-icons/io5";
import {
    Box,
    Button,
    Divider,
    Flex,
    HStack,
    Icon,
    IconButton,
    Text,
    Tag,
    useColorMode,
    useColorModeValue,
    Input,
    Hide,
	Show,
    Heading,
    useClipboard,
    Avatar,
    VStack,
} from "@chakra-ui/react";
import {
    SearchIcon,
    AddIcon,
    ArrowForwardIcon,
    ArrowUpIcon,
} from "@chakra-ui/icons";
import { useState, createElement } from "react";
import PurpleButton from "../../UI/PurpleButton";
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
        <div className="grid grid-cols-12 gap-x-10 mx-10 dippy sm:dippy md:griddy">          
																																																																																														  
																																																																																	<div
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
																																																							
            {/* <ProfileHeader
                    opacity={colorMode === "light" ? 1 : 0.5}
                    filter={filter}
                /> */}
            <div className="col-start-4 col-span-6 flex flex-col items-center">
                <Content className="min-w-full">{children}</Content>

                <Footer
                    style={{
                        textAlign: "center",
                        bottom: 0,
                        position: "fixed",
                        opacity: 0.7,
                    }}
                >
                    Aerx ©2022 Created by AERX Labs
                </Footer>
            </div>
                <div className="col-start-10 col-span-3 flex flex-col items-center">
                    <LeftSide
                        collapse={[isCollapsed, setIsCollapsed]}
                        bg={bg}
                        className="min-w-full"
                    />
                </div>            
        </div>
		<div className="items-center md:dippy">
                <Content className="min-w-full">{children}</Content>

                <Footer
                    style={{
                        textAlign: "center",
                        bottom: 0,
                        position: "fixed",
                        opacity: 0.7,
                    }}
                >
                    Aerx ©2022 Created by AERX Labs
                </Footer>
            </div>
	</div>
    );
}

const ProfileHeader = ({ ...rest }) => {
    return (
        <Header
            style={{
                margin: "0 10% 0",
                marginTop: 5,
            }}
        >
            <Heading size="lg" mb={2}>
                Flow
            </Heading>
            <Button variant="ghost" styles={styles.marker}>
                My
            </Button>
            <Button variant="ghost" className="opacity-50 text-xs">
                <Text fontWeight="medium">Favourite</Text>
            </Button>
            <Button variant="ghost" className="opacity-50 text-xs">
                <Text fontWeight="medium">Subscriptions</Text>
            </Button>
            <Box className="float-right">
                <IconButton
                    aria-label="Search"
                    isRound
                    size="xs"
                    variant="ghost"
                    icon={<SearchIcon />}
                    mr={5}
                    {...rest}
                />
            </Box>
        </Header>
    );
};

const RightSide = ({ profile, balance, ...rest }) => {
    const value = "0jx12hbuwc34jcsuhwoc" ;
    const { hasCopied, onCopy } = useClipboard(value);
    console.log(balance);
    const picBg = useColorModeValue("white", "gray.300");
    const bgGradient = useColorModeValue(
        "linear(#edf2f700, #edf2f720 15%, gray.100 90%)",
        "linear(#1E202100, #1E202100 15%, lightblack 90%)",
    );
    const tags = ["#crypto", "#eth", "#near", "#aerx"]; // profile.tags
    const stats = [
        {
            title: "FOLLOWING",
            count: "4.5K",
        },
        {
            title: "FOLLOWERS",
            count: "750K",
        },
        {
            title: "LIKES",
            count: "10K",
        },
    ]; // profile.stats

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
                        <IconButton
                            mr="-3.5"
                            icon={<IoHeartOutline />}
                            color="white"
                            variant="ghost"
                            size="lg"
                            isRound
                        />
                        <IconButton
                            icon={<IoNotificationsOutline />}
                            color="white"
                            variant="ghost"
                            size="lg"
                            isRound
                        />
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
                        <HStack className="bottom-0 gap-x-3 my-2" >
                            <Box>
                                <Button 
                                    borderRadius={20}
                                    bgColor="#6054F0"
                                    size="sm"
                                    variant="outline"
                                    leftIcon={<RiSendPlaneFill />} left={1}>
                                    Send
                                </Button>
                            </Box>
                            <Box>
                                <Button
                                    borderRadius={20}
                                    bgColor="transparent"
                                    size="sm"
                                    variant="outline"
                                    leftIcon={<MdOutlineDone />}
                                    > Followed 
                                </Button>
                            </Box> 
                            
                        </HStack>
                        
                    </Box>
                </Box>
                <HStack m={3} justifyContent="left">
                    <Text> {value} </Text>
                    <IconButton 
                        onClick={onCopy} 
                        variant='ghost'
                        colorScheme='gray'
                        isRound
                        icon={<MdCopyAll />} ml={2} />
                </HStack>
                
                <Box className="text-left px-4 mb-5" sx={styles}>
                    <Text className="opacity-50 mb-3">ABOUT</Text>
                    <Text>
                        {profile?.aboutMe ||
                            `I work as a doctor, but in my free time I like to make
                        funny pictures and videos. See more details in my
                        collection.`}
                    </Text>
                    {/* <Text className="opacity-50 mb-2 mt-6 ">HOBBYES</Text>
                    <Text className="text-sm">
                        {profile?.hobbys ||
                            `Hobbies, what's that?!`}
                    </Text> */}
                </Box>
                <Divider />
                <RSideBarBalance balance={balance} />
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
                {/* ) : iterType === "stats" ? (
                    <Box fontSize={8} key={iter.title}>
                        <Text opacity={0.5} mb={1} textAlign="center">
                            {iter.title}
                        </Text>
                        <Heading size="md" textAlign="center">
                            {iter.count}
                        </Heading>
                        <AvatarGroup size="xs" max={2} my={2}>
                            <Avatar
                                name="Ryan Florence"
                                src="https://bit.ly/ryan-florence"
                            />
                            <Avatar
                                name="Segun Adebayo"
                                src="https://bit.ly/sage-adebayo"
                            />
                        </AvatarGroup>
                    </Box> */}

const RSideBarBalance = ({ balance, ...rest }) => {
    return (
        <Box
                bgImage="/images/balance-bg.svg"
                bgColor="#ffff0006"
                bgPos="center"
                bgSize="cover"
                bgBlendMode="darken"
                borderRadius="lg"
                w="100%"
                py={3}
                >
            <VStack
               className="content-align-left px-4" 
            >   
                <Text className="font-semibold" >Your Balance</Text>
                <HStack>
                    <Icon color="yellow" as={ThunderboltFilled} />
                    <Heading size="md">{balance || 0}</Heading>
                    {/** profile.balance */}
                </HStack>
                <HStack>
                    <Button
                        borderRadius={20}
                        size="sm"
                        variant="solid"
                        leftIcon={<ArrowUpIcon />}
                        > Send
                    </Button>
                    <Button
                        borderRadius={20}
                        size="sm"
                        variant="solid"
                        leftIcon={<ArrowForwardIcon />}
                        > Receive
                    </Button>
                </HStack>
            </VStack>
        </Box>
    );
};
const LeftSide = ({ collapse, ...rest }) => {
    const toggle = () => {
        collapse[1](!collapse[0]);
    };

    const collections = [
        {
            name: "Music",
            count: 345,
            color: "bg-blue-500",
        },
        {
            name: "Memes",
            count: 95,
            color: "bg-red-500",
        },
        {
            name: "Art",
            count: 89,
            color: "bg-green-500",
        },
        {
            name: "Pop",
            count: 63,
            color: "bg-orange-500",
        },
    ];

    return (
        <Box
            className="flex flex-col w-full sticky top-10"

        >
			<Hide below="lg">
            <Heading size="lg" ml={3}>Collections</Heading>
			</Hide>
			<Show below="lg">
            <Heading size="md" ml={3}>Collections</Heading>
			</Show>
            <div className="mt-3">
                {collections.map((item, index) => (
                    <div
                        key={index}
                        className={`flex flex-col shadow-lg h-32 w-full m-3 rounded-xl hover:-translate-y-6 translate-y-0 transition ${item.color} `}
                    >
                        <div className="flex flex-row items-center justify-start">
                            <Text className="m-3">{item.name}</Text>
                            <Tag
                                size="xs"
                                variant="solid"
                                borderRadius={15}
                                px={1.5}
                                py={0.5}
                                mt={2}
                                bg="#6054F0"
                                color="invert(bg)"
                                className="m-1"
                            >
                                {item.count}
                            </Tag>
                        </div>
                        
                    </div>
                ))}
            </div>
        </Box>
    );
};

const WalletModal = ({ ...rest }) => {};

const styles = {
    fontFamily: "Open Sans",
    fontSize: 12,
};
