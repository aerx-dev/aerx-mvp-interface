// import ProfilePage from "../components/ProfilePage";
import React from "react";
import {
    Box,
    useColorModeValue,
    Button,
} from "@chakra-ui/react";
import NewPost from "../Post/new-post";
import Layout from "../Layout";
import { profileStore } from "../../stores/profile.js";
import Post from "..//Post/post";

import { useState } from "react";
import { nearStore } from "../../stores/near";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";
import useFetchPosts from "../../hooks/useFetchPosts"

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
});

const Profile = () => {
    const nearState = nearStore((state) => state);
    const profileState = profileStore((state) => state);
    const [profileLoaded, setProfileLoaded] = useState(false);
    
    const [posts, refreshPosts] = useFetchPosts(nearState.accountId)
    
    const { t } = useTranslation("profile");

    const bg = useColorModeValue("gray.100", "gray.900");

    if (profileState.profile && profileLoaded === false) {
        setProfileLoaded(true);
    }

    return (
        <Layout>
            <LazySider bg={bg} profile={profileState.profile}>
                <Box>
                    <NewPost state={nearState} bg={bg} />

                    {posts ? (
                        posts.map((el) => {
                            return <Post key={el.id} el={el} />;
                        })
                    ) : (
                        <></>
                    )}
                </Box>
            </LazySider>
        </Layout>
    );
};

export default Profile;
