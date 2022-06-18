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

export default ProfilePage;
