import { Layout } from "antd";
import {
    Box,
    Flex,
    Text,
    Input,
    useColorMode,
    useColorModeValue,
} from "@chakra-ui/react";
import { useState, createElement } from "react";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import useTranslation from "next-translate/useTranslation";

const { Header, Sider, Content, Footer } = Layout;

export default function SideBar({ children }) {
    const { t } = useTranslation("Profile");
    const [isCollapsed, setIsCollapsed] = useState(false);
    const toggle = () => {
        setIsCollapsed(!isCollapsed);
    };
    const { colorMode } = useColorMode();

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
                <LSidebarContent
                    bg={useColorModeValue("gray.100", "gray.700")}
                />
            </Sider>
            <Layout
                style={{
                    marginLeft: 250,
                    marginRight: isCollapsed ? 120 : 240,
                }}
            >
                <Header
                    style={{
                        padding: 0,
                        marginTop: 5,
                    }}
                >
                    <Text
                        fontSize="2xl"
                        fontFamily="monospace"
                        fontWeight="bold"
                    >
                        Flow
                    </Text>
                    <Input
                        onChange={() => null}
                        type="search"
                        placeholder={t("search")}
                        borderRadius={20}
                        filter={
                            colorMode === "light" ? "invert(1)" : "invert(0)"
                        }
                    />
                    {createElement(
                        isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                        {
                            className: "trigger",
                            onClick: toggle,
                        },
                    )}
                </Header>
                <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
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
                <RSidebarContent
                    bg={useColorModeValue("gray.100", "gray.700")}
                />
            </Sider>
        </Layout>
    );
}

const LSidebarContent = ({ ...rest }) => {
    return (
        <Box
            borderRight="1px"
            borderRightColor={useColorModeValue("gray.100", "gray.900")}
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
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    left sider
                </Text>
            </Flex>
            {/* {iters.map((iter) => (
                <LSideBarIters key={iter.name} icon={iter.icon}>
                    {iter.name}
                </LSideBarIters>
            ))} */}
        </Box>
    );
};

const RSidebarContent = ({ ...rest }) => {
    return (
        <Box
            borderLeft="1px"
            borderLeftColor={useColorModeValue("gray.100", "gray.900")}
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
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    right sider
                </Text>
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
