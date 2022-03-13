import { Layout } from "antd";
import {
    Box,
    Flex,
    Text,
    Input,
    IconButton,
    Button,
    useColorMode,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState, createElement } from "react";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import useTranslation from "next-translate/useTranslation";

const { Header, Sider, Content, Footer } = Layout;

export default function SideBar({ children, bg }) {
    const { t } = useTranslation("Profile");
    const [isCollapsed, setIsCollapsed] = useState(false);
    const toggle = () => {
        setIsCollapsed(!isCollapsed);
    };
    const { colorMode } = useColorMode();
    const filter = colorMode === "light" ? "invert(1)" : "invert(0)";

    return (
        <Layout hasSider>
            <Sider
                trigger={null}
                collapsed={false}
                style={{
                    overflow: "auto",
                    height: "100vh",
                    position: "fixed",
                    left: 0,
                    top: "4.5rem",
                    bottom: 0,
                }}
            >
                <LSidebarContent borderColor={bg} bg={bg} />
            </Sider>
            <Layout
                style={{
                    marginLeft: 250,
                    marginRight: isCollapsed ? 120 : 240,
                    backgroundColor: "none",
                }}
            >
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
                            opacity={colorMode === "light" ? 1 : 0.5}
                            filter={filter}
                        />
                        {createElement(
                            isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                            {
                                className: "trigger",
                                onClick: toggle,
                            },
                        )}
                    </Box>
                </Header>
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
                    right: 30,
                    top: "4.5rem",
                    bottom: 0,
                }}
            >
                <RSidebarContent borderColor={bg} bg={bg} />
            </Sider>
        </Layout>
    );
}

const LSidebarContent = ({ borderColor, ...rest }) => {
    return (
        <Box
            borderRight="1px"
            borderRightColor={borderColor}
            w={{ base: "full", md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex
                h="20"
                alignItems="center"
                mx="8"
                justifyContent="space-between"
            >
                <Text
                    fontSize="2xl"
                    fontFamily="monospace"
                    fontWeight="bold"
                ></Text>
            </Flex>
            {/* {iters.map((iter) => (
                <LSideBarIters key={iter.name} icon={iter.icon}>
                    {iter.name}
                </LSideBarIters>
            ))} */}
        </Box>
    );
};

const RSidebarContent = ({ borderColor, ...rest }) => {
    return (
        <Box
            borderLeft="1px"
            borderLeftColor={borderColor}
            w={{ base: "full", md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex
                h="20"
                alignItems="center"
                mx="8"
                justifyContent="space-between"
            >
                <Text
                    fontSize="2xl"
                    fontFamily="monospace"
                    fontWeight="bold"
                ></Text>
            </Flex>
            {/* {iters.map((iter) => (
                <RSideBarIters key={iter.name} icon={iter.icon}>
                    {iter.name}
                </RSideBarIters>
            ))} */}
        </Box>
    );
};

const LSideBarIters = ({ icon, children, ...rest }) => {
    return null;
    // iterabe items for left side nav
};

const RSideBarIters = ({ icon, children, ...rest }) => {
    return null;
    // iterabe items for right side nav
};
