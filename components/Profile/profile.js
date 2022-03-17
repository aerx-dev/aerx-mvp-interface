// import ProfilePage from "../components/ProfilePage";
import React, { Suspense } from "react";
import {
    Box,
    Heading,
    useColorModeValue,
    Grid,
    Text,
    Image as ChakraImage,
    VStack,
    HStack,
    Button,
} from "@chakra-ui/react";
import Image from "next/image";
import lightningbolt from "../../public/images/lightningbolt.png";
import { AiOutlineThunderbolt } from "react-icons/ai";
import NewPost from "../Post/new-post";
import Layout from "../Layout";
import { profileStore } from "../../stores/profile.js";
import Post from "..//Post/post";

import { useState, useEffect } from "react";
import { nearStore } from "../../stores/near";
import { getBalance } from "../../lib/tokenContract";
import useTranslation from "next-translate/useTranslation";
import dynamic from "next/dynamic";

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
    const [first, setFirst] = useState(true);
    const nearState = nearStore((state) => state);
    const profileState = profileStore((state) => state);
    const [profileLoaded, setProfileLoaded] = useState(false);
    const [balance, setBalance] = useState(0);
    const [profile, setProfile] = useState(
        profileState.profile || { posts: [], follows: [] },
    );
    const { t } = useTranslation("profile");

    const bg = useColorModeValue("gray.100", "gray.900");

    useEffect(() => {
        async function userNearBalance() {
            if (nearState.tokenContract) {
                let res = await getBalance(nearState);
                setBalance(res);
            }
        }
        userNearBalance();
    }, [nearState]);

    if (profileState.profile && profileLoaded === false) {
        setProfile(profileState.profile);
        setProfileLoaded(true);
    }

    return (
        <Layout>
            <LazySider bg={bg} profile={profile}>
                <Box>
                    <NewPost state={nearState} bg={bg} />

                    {profile.posts ? (
                        profile.posts.map((el) => {
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
