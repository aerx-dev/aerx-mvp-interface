import React from "react";
import { Box, useColorModeValue, Button } from "@chakra-ui/react";
import NewPost from "../Post/new-post";
import Layout from "../Layout";
import Searchpost from "../Post/searchPost";
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
const Search = ({searched}) => {
    const nearState = nearStore((state) => state);
    const [profileLoaded, setProfileLoaded] = useState(false);

    const bg = useColorModeValue("gray.100", "lightblack");

    if (nearState.profile && profileLoaded === false) {
        setProfileLoaded(true);
    }
    const [currentSearchProfile, setCurrentSearchProfile] = useState();

    useEffect(() => {
        async function get_current_search_profile() {
            
            var res = await nearState.pnftContract.get_user_ids({
                user_id: {searched}.searched?.searched,
                
            });

            setCurrentSearchProfile(res);
            // return res;
            
        }
        get_current_search_profile();
    }, [nearState, nearState.accountId, {searched}.searched])


    return (
        <Layout>
            <LazySider bg={bg} state={nearState}>
                <Box>
                    <NewPost state={nearState} bg={bg} />

                    {currentSearchProfile && nearState?.accountId ? (
                        currentSearchProfile
                            .filter(
                                (nft) => nft.owner_id === nearState.accountId,
                            )
                            .map((nft) => {
                                return <Searchpost key={nft.post_id} nft={nft} />;
                            })
                    ) : (
                        <></>
                    )}
                </Box>
            </LazySider>
        </Layout>
    );
};

export default Search;
