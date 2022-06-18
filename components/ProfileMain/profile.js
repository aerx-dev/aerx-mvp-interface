import React from "react";
import { Box, useColorModeValue, Button } from "@chakra-ui/react";
import NewPost from "../Post/new-post";
import Layout from "../Layout";
import Post from "../Post/post";
import { useState } from "react";
import { nearStore } from "../../stores/near";
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
/*Moses fix the idea it is currently causing a break*/
//const Profile = async () => {
const Profile = ({profiledid}) => {
    const nearState = nearStore((state) => state);
    const [profileLoaded, setProfileLoaded] = useState(false);

    const bg = useColorModeValue("gray.100", "lightblack");

    if (nearState.profile && profileLoaded === false) {
        setProfileLoaded(true);
    }
        console.log('profiledid',{profiledid}.profiledid?.profiledid);
       // console.log('profiledid2',profiledid());


    return (
        <Layout>
            <LazySider bg={bg} state={nearState}>
                <Box>
                    <NewPost state={nearState} bg={bg} />

                    {nearState?.feed && nearState?.accountId ? (
                        nearState.feed
                            .filter(
                                (nft) => nft.owner_id === {profiledid}.profiledid?.profiledid,
                            )
                            .map((nft) => {
                                return <Post key={nft.post_id} nft={nft} />;
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
