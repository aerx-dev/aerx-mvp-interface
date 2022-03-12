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

    const bg = useColorModeValue("white", "gray.800");
    const pageBg = useColorModeValue("gray.50", "gray.800");
    const picBg = useColorModeValue("gray.200", "gray.700");
    const imageBg = useColorModeValue("gray.100", "#0a0a0a");

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

    function headerImage() {
        if (profile.profileImage) {
            return (
                <ChakraImage
                    src={profile.headerImage}
                    alt="header"
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
            <Box bg={pageBg}>
                <Box height="250px" bg={imageBg} width="100%" position="fixed">
                    {headerImage()}
                </Box>

                <Box
                    maxWidth={1000}
                    margin="0 auto"
                    className="px-4 md:px-10"
                    py={4}
                    zIndex={10}
                    position={"relative"}
                    minHeight="100vh"
                >
                    <Grid
                        templateColumns={[
                            "repeat(100%)",
                            "repeat(100%)",
                            "220px calc(100% - 200px)",
                        ]}
                        gap="20px"
                    >
                        <VStack>
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
                        </VStack>
                        <Box pr={8}>
                            <Box
                                bg={bg}
                                p={4}
                                rounded="lg"
                                borderWidth={2}
                                mb={4}
                            >
                                <Heading>{profile.fullName}</Heading>

                                <Text mb={4}>{profile.aboutMe}</Text>

                                <Box>
                                    <NewPost state={nearState} />
                                </Box>
                            </Box>

                            {profile.posts ? (
                                profile.posts.map((el) => {
                                    return <Post key={el.id} el={el} />;
                                })
                            ) : (
                                <></>
                            )}
                        </Box>
                    </Grid>
                </Box>
            </Box>
        </Layout>
    );
};

export default Profile;
