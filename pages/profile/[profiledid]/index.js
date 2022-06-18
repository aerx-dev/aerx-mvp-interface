import { useRouter } from 'next/router'
import Profile from "../../../components/ProfileMain";
import { Box } from "@chakra-ui/react";


const ProfilePage = () => {
  const router = useRouter();
  const profiledid = router.query

    return (
        <Box>
            <Profile profiledid = {profiledid}  />
        </Box>
    );
};
export default ProfilePage;
