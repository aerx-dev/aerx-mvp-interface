import Layout from "../Layout";
import {
    Box,
    Heading,
    Image as ChakraImage,
    useColorModeValue,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { useRef, useState, useEffect, useReducer } from "react";
import { registerUserIfNotRegistered } from "../../lib/auth";
import { nearStore } from "../../stores/near";
import CreateProfileForm from "./Form";
import useIPFS from "../../hooks/useIPFS";
import { Big } from "big.js";
import { contractFullAccessKey } from "../../lib/contract_call"

import { useLocalStorage } from "beautiful-react-hooks"

const Account = () => {
    // The profile picture which will go into the NFT

    const { t } = useTranslation("account");
    const picBg = useColorModeValue("gray.200", "gray.700");
    const nearState = nearStore(state => state)

    // The uploaded image which will be deployed through IPFS
    const [uploadImg, setUploadImg] = useState();
    // Ipsf hook with details and upload hook.
    const ipfsData = useIPFS(uploadImg);


    const [profile, setProfile] = useState({
        username: nearState.accountId,
        fullName: "",
        aboutMe: "",
        hobbys: "",
        city: "",
        country: "",
    });

    const [profileNFT, setProfileNFT] = useState({
        title: profile.fullName,
        description: "AERX ProfileNFT for " + profile.fullName,
        media: ipfsData.fileUrl,
        media_hash: ipfsData.urlSha256,
        // issued_at: "", TODO: today
        extra: profile,
    })

    function profileImageChange(event) {
        const { files } = event.target;
        if (files && files.length) {
            // // TODO assert that it is a image file
            // const filename = files[0].name;
            // var parts = filename.split(".");
            // const fileType = parts[parts.length - 1];
            // console.log("fileType", fileType); //ex: zip, rar, jpg, svg etc.
            setUploadImg(() => event.target.files[0]);
            // TODO: get media hash :white_check_mark:
        }
    }

    function update(e) {
        let path = e.currentTarget.dataset.path;
        let newProfile = profile;
        newProfile[path] = e.currentTarget.value;
        newProfile.username = nearState.accountId;

        setProfile(() => newProfile);
        console.log(profile)
    }

    async function handleSave(e) {
        e.preventDefault();
        let profileToSave = {
            title: profile.fullName,
            description: "AERX ProfileNFT for " + profile.fullName,
            media: ipfsData.fileUrl,
            media_hash: ipfsData.urlSha256,
            // issued_at: "", TODO: today
            extra: JSON.stringify(profile),
        };
        const cnftContract = await contractFullAccessKey("profileNft")
        console.log(profileToSave)
        // TODO correct metadata
        // 2. Check if user is registered for tokens. This should happen in the contract.
        // if (nearState.tokenContract) {
        //     registerUserIfNotRegistered(nearState);
        // }

        // 3. send mint request
        try {

            const res = await cnftContract.nft_mint(
                {
                    receiver_id: nearState.accountId,
                    token_metadata: profileToSave,
                },
                "300000000000000", // attached GAS (optional)
                "9660000000000000000111" // attached deposit in yoctoNEAR (optional))
            )
            console.log(res)
        } catch (e) {
            console.log("NFT could not be minted! Error: " + e.message)
        }
    }


    return (
        <Layout>
            <Box
                className="px-4 md:px-10"
                py={2}
                maxWidth={1100}
                margin="0 auto"
            >
                <Heading as="h1" mb={3}>
                    {t("title")}
                </Heading>
                <CreateProfileForm
                    t={t}
                    picBg={picBg}
                    profile={profile}
                    uploadImg={uploadImg}
                    profileImageChange={profileImageChange}
                    update={update}
                    save={handleSave}
                />
                {/* <Button colorScheme="green" mt={2} size="lg" onClick={handleSave}>
          {t('label.save')}
        </Button> */}
                {/* <IpfsComponent state={uploadImg} /> */}
            </Box>
        </Layout>
    );
};

export default Account;
