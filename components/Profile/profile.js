// import ProfilePage from "../components/ProfilePage";
import {
    Box,
    Heading,
    useColorModeValue,
    Grid,
    Text,
    Image as ChakraImage,
    VStack,
    HStack,
} from "@chakra-ui/react";
import Image from "next/image";
import lightningbolt from "../../public/images/lightningbolt.png";
import { AiOutlineThunderbolt } from "react-icons/ai";
import NewPost from "../Post/new-post";
import Layout from "../Layout";
import { profileStore } from "../../stores/profile.js";
import Post from "..//Post/post";
import SideBar from "./SideNav";

import { useState, useEffect } from "react";
import { nearStore } from "../../stores/near";
import { getBalance } from "../../lib/tokenContract";
import useTranslation from "next-translate/useTranslation";

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
    const picBg = useColorModeValue("gray.200", "gray.700");

    useEffect(() => {
        async function userNearBalance() {
            if (nearState.tokenContract) {
                let res = await getBalance(nearState);
                setBalance(res);
            }
        }
        userNearBalance();
    }, [nearState]);

    function profileImage() {
        if (profile.profileImage) {
            return (
                <ChakraImage
                    src={profile.profileImage}
                    alt="profile"
                    height="100%"
                    width="100%"
                    objectFit="cover"
                />
            );
        }
    }

    if (profileState.profile && profileLoaded === false) {
        setProfile(profileState.profile);
        setProfileLoaded(true);
    }

    return (
        <Layout>
            <SideBar bg={bg}>
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

                {/* <VStack>
                            <Box
                                overflow={"hidden"}
                                borderWidth={2}
                                height="320px"
                                rounded="lg"
                                width="100%"
                                maxWidth={["100%", "400px", "225px"]}
                                bg={picBg}
                                margin="0 auto"
                            >
                                {profileImage()}
                            </Box>
                            <Box bg={bg} py={2} width="100%" rounded={10}>
                                <HStack px={2}>
                                    <Image
                                        src={lightningbolt}
                                        alt="Lightning bolt"
                                    />
                                    <VStack px={8}>
                                        <Text textAlign="right">
                                            {t("label.balance")}
                                        </Text>
                                        <Text>{balance}</Text>
                                    </VStack>
                                </HStack>
                            </Box>
                        </VStack> */}
            </SideBar>
        </Layout>
    );
};

export default Profile;
