import { nearStore } from "../stores/near.js";
import { useState } from "react";
import Profile from "../../components/Profile";
import { Box } from "@chakra-ui/react";

export default ProfileViewer({ profiled, profiledid }) {
 return (
        <Box>
            <Profile />
        </Box>
    );
};


export async function getServerSideProps({ params }) {
  const nearState = nearStore((state) => state);
  const profiledid = params.profiledid;
  const profiled = await nearState.pnftContract.profile_by_id({
                user_id: nearState.accountId,
                user_to_find_id: profiledid,
            }).then(res => res.json());
  return {
    props: {
      profiledid,
      profiled
    }
  }
}
