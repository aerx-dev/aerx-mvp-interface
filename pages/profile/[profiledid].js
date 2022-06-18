import { nearStore } from "../../stores/near.js";
import { useState } from "react";
import Profile from "../../components/Profile";
import { Box } from "@chakra-ui/react";
const ProfilePage = () => {
    return (
        <Box>
            <Profile />
        </Box>
    );
};
export async function getServerSideProps() {
  // Fetch data from external API
  const nearState = nearStore((state) => state)
    
  const res = await nearState.pnftContract.profile_by_id({
                user_id: 'dipo1.testnet',
                user_to_find_id: 'dipo1.testnet',
            })
  const data = await res.json()
  console.log("dd",data)
  // Pass data to the page via props
  return { props: { data } }
}
export default ProfilePage;
