import React from "react";
import { List, ListItem, Box } from "@chakra-ui/react";
import Link from "next/link";

const NavLinks = () => {
    return (
        <Box marginRight={"800px"}>
            <List
                display={"flex"}
                flexDirection="row"
                flexBasis={"basis"}
                alignItems="flex-start"
                textColor={"#322E65"}
                opacity={"0.5"}
            >
                <ListItem paddingX={"6"}>
                    <a href="#feature1">Home</a>
                </ListItem>
                <ListItem paddingX={"6"}>
                    <Link href="/a">Features</Link>
                </ListItem>
                <ListItem paddingX={"6"}>
                    <Link href="/e">About us</Link>
                </ListItem>
            </List>
        </Box>
    );
};

export default NavLinks;
