import { Layout } from "antd";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    ThunderboltFilled,
} from "@ant-design/icons";
import { HiLocationMarker } from "react-icons/hi";
import { IoNotificationsOutline, IoHeartOutline } from "react-icons/io5";
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
    //SimpleGrid,
    Stack,
    Heading,
    AvatarGroup,
    Avatar,
} from "@chakra-ui/react";
import {
    SearchIcon,
    AddIcon,
    ArrowForwardIcon,
    ArrowDownIcon,
} from "@chakra-ui/icons";
import { useState, createElement } from "react";
import PurpleButton from "../../UI/PurpleButton";

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
        <div className="flex flew-row min-w-full justify-center space-x-7">
            <div className="w-60 flex flex-col items-center">
                <LeftSide collapse={[isCollapsed, setIsCollapsed]} bg={bg} />
            </div>
            <div className="w-[600px] flex flex-col items-center">
                <ProfileHeader
                    opacity={colorMode === "light" ? 1 : 0.5}
                    filter={filter}
                />
                <Content className="min-w-full">{children}</Content>
                <Footer
                    style={{
                        textAlign: "center",
                        bottom: 0,
                        position: "fixed",
                        right: "40vw",
                        opacity: 0.7,
                    }}
                >
                    Aerx ©2022 Created by AERX Labs
                </Footer>
            </div>

            <div className="w-80 flex flex-col items-center min-h-full" trigger={null}>
                <RightSide
                    profile={state?.profile}
                    balance={state?.aexBalance}
                    bg={bg}
                    className="sticky top-20 min-h-max"
                />
            </div>
        </div>
    );
}

const ProfileHeader = ({ ...rest }) => {
    return (
        <Header className="min-w-full">
            <Heading size="lg">Flow</Heading>
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
        <Box
            className="border-1  max-h-screen rounded-xl "
            // w={{ base: "full", md: "22%" }}
            {...rest}
        >
            <Flex
                className="align-middle mx-2 mt-2 justify-between"
                direction="column"
            >
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
                        fontFamily="poppins"
                    >
                        <Text
                            className="h-1/6 mb-2"
                            fontWeight="bold"
                            fontSize="2xl"
                        >
                            {profile?.fullName || "Pavel Dantsev"}
                        </Text>
                        <Text as="i" sx={styles} fontWeight="medium">
                            @{profile?.username || "pashq"}
                        </Text>
                        <RSideBarIters iterType="tags" data={tags} {...rest} />
                        <HStack
                            className="absolute bottom-0 w-full"
                            sx={styles}
                        >
                            <Text>
                                {/* <Icon as={HiLocationMarker} /> {profile.country} */}
                                <Icon as={HiLocationMarker} /> aerx
                            </Text>
                            <PurpleButton leftIcon={<AddIcon />} right={4}>
                                Follow
                            </PurpleButton>
                        </HStack>
                    </Box>
                </Box>
                <Box className="text-center p-5 py-7" h="20vh" sx={styles}>
                    <Text className="opacity-50 mb-3">ABOUT</Text>
                    <Text>
                        {profile?.aboutMe ||
                            `I work as a doctor, but in my free time I like to make
                        funny pictures and videos. See more details in my
                        collection.`}
                    </Text>
                    {/* <Text className="opacity-50 mb-2 mt-6 font-semibold">HOBBYES</Text>
                    <Text className="text-sm">
                        {profile?.hobbys ||
                            `Hobbies, what's that?!`}
                    </Text> */}
                </Box>
                <Divider />
                <RSideBarIters iterType="stats" data={stats} {...rest} />
                <RSideBarBalance balance={balance} {...rest} h="10vh" />
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
            justifyContent="space-evenly"
            alignItems="center"
            w="100%"
            h={iterType === "stats" ? "12vh" : "unset"}
        >
            {/* profile.tags */}
            {data.map((iter) =>
                iterType === "tags" ? (
                    <Tag
                        size="xs"
                        key={iter}
                        variant="solid"
                        borderRadius={15}
                        px={1.5}
                        py={0.5}
                        as="i"
                        bg="gray.800"
                        color="invert(bg)"
                    >
                        {iter}
                    </Tag>
                ) : iterType === "stats" ? (
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
                    </Box>
                ) : null,
            )}
        </HStack>
    );
};

const RSideBarBalance = ({ balance, ...rest }) => {
    return (
        <Flex
            textAlign="center"
            direction="column"
            justifyContent="center"
            alignItems="center"
            {...rest}
            w="100%"
        >
            <Flex
                bgImage="/images/balance-bg.svg"
                bgColor="#ffff0006"
                bgPos="center"
                bgSize="contain"
                bgBlendMode="darken"
                borderRadius="lg"
                w="100%"
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                py={1}
                my={2}
            >
                <Icon mx={6} color="yellow" as={ThunderboltFilled} />
                <Box>
                    <Text opacity={0.7}>BALANCE</Text>
                    <Heading size="sm">{balance || 0}</Heading>{" "}
                    {/** profile.balance */}
                </Box>
                <Box position="absolute" right={7}>
                    <IconButton
                        aria-label="send"
                        isRound
                        size="sm"
                        variant="ghost"
                        mr={2}
                        icon={<Icon as={ArrowForwardIcon} />}
                    ></IconButton>
                    <IconButton
                        aria-label="recieve"
                        isRound
                        size="sm"
                        variant="ghost"
                        icon={<Icon as={ArrowDownIcon} />}
                    ></IconButton>
                </Box>
            </Flex>
        </Flex>
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
        <div className="flex flex-col w-full">
            <Heading size="lg">Collections</Heading>
            <div className="grid grid-rows-4 grid-flow-col gap-4 max-h-80 mt-10">
                {collections.map((item, index) => (
                    <div
                        key={index}
                        className={`flex flex-col shadow-lg h-36 w-full rounded-xl hover:-translate-y-6 translate-y-0 transition ${item.color}`}
                        {...rest}
                    >
                        <div className="flex flex-row items-center justify-end">
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
                        <Text className="m-1 mt-3">{item.name}</Text>
                    </div>
                ))}
            </div>
        </div>
    );
};

const WalletModal = ({ ...rest }) => {};

const styles = {
    fontFamily: "poppins",
    fontSize: 12,
};