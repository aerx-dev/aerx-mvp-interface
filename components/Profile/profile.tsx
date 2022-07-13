import React, { Suspense } from "react";
import {
    Text,
    useColorModeValue,
    Button,
    Spinner,
    Grid,
    GridItem,
    VStack,
} from "@chakra-ui/react";
import NewPost from "../Post/new-post";
import Post from "../Post/post";
import { useState } from "react";
import { nearStore } from "../../stores/near";
import dynamic from "next/dynamic";
import Collections from "./Collections";
import SideBar from "./SideBar";
import { Layout } from "antd";

// important! lazy loads the profile components initially
const LazySider = dynamic(() => import("./SideBar"), {
    loading: () => (
        <Button
            isLoading
            variant="ghost"
            position="absolute"
            left="50vw"
            top="50vh"
            disabled
        />
    ),
}) as any; // TODO: FOR NOW TO REMOVE ERROR

const { Content, Sider } = Layout;

/*Moses fix the idea it is currently causing a break*/
//const Profile = async () => {
const Profile = () => {
    const nearState = nearStore((state) => state);
    const [profileLoaded, setProfileLoaded] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const bg = useColorModeValue("gray.100", "lightblack");

    if (nearState.profile && profileLoaded === false) {
        setProfileLoaded(true);
    }

    return (
        <Grid
            w={"90%"}
            maxW={"1440px"}
            mx={"auto"}
            templateAreas={`"left center right"`}
            gridTemplateColumns={"22.5% 50% 25%"}
            gap={"1.5%"}
        >
            <SideBar nearState={nearState} bg={bg} />
            <VStack>
                <NewPost bg={bg} />
                {nearState?.feed && nearState?.accountId ? (
                    nearState.feed
                        .filter((nft) => nft.owner_id === nearState.accountId)
                        .map((nft, idx) => {
                            return <Post key={nft.post_id + idx} nft={nft} />;
                        })
                ) : (
                    <>
                        <Text>No posts yet</Text>
                    </>
                )}
            </VStack>

            <Collections
                collapse={[isCollapsed, setIsCollapsed]}
                // className="min-w-full"
            />
        </Grid>
    );
};

export default Profile;
