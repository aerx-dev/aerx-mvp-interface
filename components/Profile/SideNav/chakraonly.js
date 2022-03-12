import React from "react";
import {
    IconButton,
    Box,
    CloseButton,
    Flex,
    Icon,
    useColorModeValue,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
} from "@chakra-ui/react";

export default function Sidebar({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box minH="100vh">
            <SidebarContent
                bg={useColorModeValue("gray.100", "gray.900")}
                onClose={() => onClose}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full"
            >
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            <Box ml={{ base: 0, md: 60 }} p="4">
                {children}
            </Box>
        </Box>
    );
}

const SidebarContent = ({ onClose, ...rest }) => {
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
                    profile picture
                </Text>
                <CloseButton
                    display={{ base: "flex", md: "none" }}
                    onClick={onClose}
                />
            </Flex>
            {/* {iters.map((iter) => (
                <NavIters key={iter.name} icon={iter.icon}>
                    {iter.name}
                </NavIters>
            ))} */}
        </Box>
    );
};

const NavIters = ({ icon, children, ...rest }) => {
    return null;
    // iterabe items for side nav
};
