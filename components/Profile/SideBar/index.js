import { Layout } from "antd";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    InstagramOutlined,
    EnvironmentOutlined,
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
import { SearchIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";
import { HiLightningBolt } from "react-icons/hi";
import { BsBoxArrowRight, BsBoxArrowInDown } from "react-icons/bs";
import { useState, createElement } from "react";
import useTranslation from "next-translate/useTranslation";

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
            <Button size="xs" variant="ghost" opacity={0.5}>
                Favourite
            </Button>
            <Box float="right">
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
        {
            title: "LIKES",
            count: "10K",
        },
    ];

    return (
        <Box
            border="none"
            w={{ base: "full", md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex
                alignItems="center"
                mx="2"
                mt={2}
                justifyContent="space-between"
                direction="column"
            >
                <Box
                    height="38vh"
                    borderTopRadius="lg"
                    width="100%"
                    bg={picBg}
                    bgImage="/images/pavel.png" // profile.profileImage
                    position="relative"
                    bgSize="cover"
                    bgRepeat="no-repeat"
                    bgPosition="center"
                >
                    <Box
                        bgGradient={bgGradient}
                        zIndex={10}
                        position="absolute"
                        bottom={0}
                        height="40%"
                        width="100%"
                        px={2}
                        color="white"
                        fontFamily="poppins"
                    >
                        <Text fontWeight="bold" h="15%">
                            Pavel Dantsev {/** profile.fullName */}
                        </Text>
                        <Text as="i" sx={styles} fontWeight="bold">
                            @pashq {/** profile.userName */}
                        </Text>
                        <LSideBarIters iterType="tags" data={tags} {...rest} />
                        <HStack
                            position="absolute"
                            bottom={0}
                            sx={styles}
                            w="100%"
                        >
                            <Text>
                                <Icon as={InstagramOutlined} /> pashq
                                {/** profile.social */}
                            </Text>
                            <Text>
                                <Icon as={EnvironmentOutlined} /> Russia
                                {/** profile.country */}
                            </Text>
                            <Button
                                leftIcon={<AddIcon />}
                                aria-label="follow"
                                borderRadius={20}
                                size="xs"
                                bgColor="#6054F0"
                                position="absolute"
                                right={4}
                            >
                                Follow
                            </Button>
                        </HStack>
                    </Box>
                </Box>
                <Box textAlign="center" h="23vh" p="10%" py="15%" sx={styles}>
                    <Text opacity={0.5} mb={2}>
                        ABOUT
                    </Text>
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
                    <Box fontSize={8}>
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
        <Box textAlign="center" sx={styles} {...rest} w="100%">
            <Flex
                direction="column"
                justifyContent="flex-end"
                alignItems="center"
                h="100%"
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
                    <Icon mx={2} color="yellow" as={HiLightningBolt} />
                    <Box>
                        <Text opacity={0.7}>BALANCE</Text>
                        <Heading size="sm">768.01</Heading>{" "}
                        {/** profile.balance */}
                    </Box>
                    <Box position="absolute" right={7}>
                        <IconButton
                            aria-label="send"
                            isRound
                            size="sm"
                            variant="ghost"
                            icon={<Icon as={BsBoxArrowRight} />}
                        ></IconButton>
                        <IconButton
                            aria-label="recieve"
                            isRound
                            size="sm"
                            variant="ghost"
                            icon={<Icon as={BsBoxArrowInDown} />}
                        ></IconButton>
                    </Box>
                </Flex>
                <Text>
                    <Icon as={WarningIcon} /> reports: 112
                    {/** profile.reports */}
                </Text>
            </Flex>
        </Box>
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
