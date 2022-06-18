import { nearStore } from "../../stores/near.js";
import { useState } from "react";
import Profile from "../../components/ProfileMain";
import { Box } from "@chakra-ui/react";

export async function getServerSideProps({ params }) {
  const profiledid = params.profiledid;
  return {
    props: {
      profiledid,
    }
  }
}

const ProfilePage = () => {
    return (
        <Box>
            <Profile profiledid = {profiledid}  />
        </Box>
    );
};
export default ProfilePage;
