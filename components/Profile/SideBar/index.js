import { Layout } from "antd";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    EnvironmentOutlined,
    ThunderboltFilled,
} from "@ant-design/icons";
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
    SimpleGrid,
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
import useTranslation from "next-translate/useTranslation";
import PurpleButton from "../../UI/PurpleButton";


const { Header, Sider, Content, Footer } = Layout;

/**
 * @global use relative|viewport sizing for width and height
 * eg vh && vw over px, worstcase use rem...
 * always define height and width in percentages %
 */

export default function SideBar({ children, bg, profile }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { t } = useTranslation("Profile");
    const { colorMode } = useColorMode();
    const filter = colorMode === "light" ? "invert(1)" : "invert(0)";

    return (
        <Layout hasSider>
            <Sider
                trigger={null}
                collapsed={false}
                style={{
                    overflow: "auto",
                    height: "full",
                    position: "fixed",
                    left: 0,
                    top: "4.5rem",
                    bottom: 0,
                }}
            >
                <LSidebarContent profile={profile} bg={bg} />
            </Sider>
            <Layout
                style={{
                    marginLeft: 250,
                    marginRight: isCollapsed ? 100 : 200,
                    backgroundColor: "none",
                }}
            >
                <ProfileHeader
                    opacity={colorMode === "light" ? 1 : 0.5}
                    filter={filter}
                />
                <Content
                    style={{
                        margin: "0 10% 0",
                        marginTop: 8,
                        overflow: "initial",
                    }}
                >
                    {children}
                </Content>
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
            </Layout>
            <Sider
                trigger={null}
                collapsed={isCollapsed}
                style={{
                    overflow: "auto",
                    height: "100vh",
                    position: "fixed",
                    right: 0,
                    top: "4.5rem",
                    bottom: 0,
                }}
            >
                <RSidebarContent
                    collapse={[isCollapsed, setIsCollapsed]}
                    bg={bg}
                />
            </Sider>
        </Layout>
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
            <Button variant="ghost">Flow</Button>
            <Button variant="ghost" className="opacity-50 text-xs">
                Favourite
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

const LSidebarContent = ({ profile, ...rest }) => {
    const picBg = useColorModeValue("white", "gray.800");
    const bgGradient = useColorModeValue(
        "linear(#edf2f700, #edf2f720 15%, gray.100 90%)",
        "linear(#17192300, #17192320 15%, gray.900 90%)",
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
    ]; // profile.stats

    return (
        <Box
            className="border-0 fixed h-full"
            w={{ base: "full", md: 60 }}
            {...rest}
        >
            <Flex
                className="align-middle mx-2 mt-2 justify-between"
                direction="column"
            >
                <Box
                    className="rounded-t-lg w-full relative "
                    height="38vh"
                    bg={picBg}
                    bgImage={profile.profileImg || "/images/pavel.png"}
                    position="relative"
                    bgSize="cover"
                    bgRepeat="no-repeat"
                    bgPosition="center"
                >
                    <Box
                        className="z-10 absolute bottom-0 h-2/5 w-full px-2 text-white"
                        bgGradient={bgGradient}
                        fontFamily="poppins"
                    >
                        <Text className="h-1/6 font-bold">
                            Pavel Dantsev {/** profile.fullName */}
                        </Text>
                        <Text as="i" sx={styles} fontWeight="bold">
                            @pashq {/** profile.userName */}
                        </Text>
                        <LSideBarIters iterType="tags" data={tags} {...rest} />
                        <HStack
                            className="absolute bottom-0 w-full"
                            sx={styles}
                        >
                            {/* <Text>
                                <Icon as={EnvironmentOutlined} /> Russia
                            </Text> */}
                            <PurpleButton leftIcon={<AddIcon />} right={4}>
                                Follow
                            </PurpleButton>
                        </HStack>
                    </Box>
                </Box>
                <Box className="text-center p-5 py-7" h="23vh" sx={styles}>
                    <Text className="opacity-50 mb-2">ABOUT</Text>
                    <Text>
                        I work as a doctor, but in my free time I lke to make
                        funny pictures and videos. See more details in my
                        collection. {/** profile.about */}
                    </Text>
                </Box>
                <Divider />
                <LSideBarIters iterType="stats" data={stats} {...rest} />
                <LSideBarBalance {...rest} h="12vh" />
            </Flex>
        </Box>
    );
};

const LSideBarIters = ({ iterType, data, ...rest }) => {
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
                        <Text opacity={0.5} mb={1}>
                            {iter.title}
                        </Text>
                        <Heading size="sm">{iter.count}</Heading>
                        <AvatarGroup size="xs" max={2}>
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

const LSideBarBalance = ({ ...rest }) => {
    return (
        <Flex
            textAlign="center"
            sx={styles}
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
                <Icon mx={2} color="yellow" as={ThunderboltFilled} />
                <Box>
                    <Text opacity={0.7}>BALANCE</Text>
                    <Heading size="sm">768.01</Heading> {/** profile.balance */}
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
const RSidebarContent = ({ collapse, ...rest }) => {
    const toggle = () => {
        collapse[1](!collapse[0]);
    };
    return (
        <Box border="none" w={200} pos="fixed" h="full" sx={styles}>
            <Flex
                alignItems="left"
                mx={2}
                mt={2}
                justifyContent="space-between"
                direction="column"
            >
                <HStack spacing={2}>
                    {createElement(
                        collapse[0] ? MenuUnfoldOutlined : MenuFoldOutlined,
                        {
                            className: "trigger",
                            onClick: toggle,
                        },
                    )}
                    <Text opacity={0.5}>SHOW ME</Text>
                </HStack>
                <Stack w="100%" pr={10} mt={10}>
                    <Box height={50} borderRadius={10} {...rest}></Box>
                    <Box height={50} borderRadius={10} {...rest}></Box>
                    <Box height={50} borderRadius={10} {...rest}></Box>
                </Stack>
            </Flex>
            {/* {iters.map((iter) => (
                <RSideBarIters key={iter.name} icon={iter.icon}>
                    {iter.name}
                </RSideBarIters>
            ))} */}
        </Box>
    );
};

const WalletModal = ({ ...rest }) => {};

const styles = {
    fontFamily: "poppings",
    fontSize: 12,
};
