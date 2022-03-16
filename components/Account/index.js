import Layout from "../Layout";
import {
    Box,
    Heading,
    Image as ChakraImage,
    useColorModeValue,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { useRef, useState, useEffect, useReducer } from "react";
import { getTotalSupply, sendToken } from "../../lib/tokenContract";
import { createUserProfileNFT } from "../../lib/NFTContract";
import { registerUserIfNotRegistered } from "../../lib/auth";
import { nearStore } from "../../stores/near";
import CreateProfileForm from "./Form";
// import content2ipfs from "../pages/api/uploadProfileNFT"
// import IpfsComponent from "../ipfs";
import useIPFS from "../../hooks/useIPFS";
import { Big } from "big.js";

import { useLocalStorage } from "beautiful-react-hooks"

const Account = () => {
    // The profile picture which will go into the NFT

    const { t } = useTranslation("account");
    const picBg = useColorModeValue("gray.200", "gray.700");

    const accountId = nearStore.accountId
    //  Store response in local storage bcs near pops up a confirmation window
    const [lastRes, setLastRes] = useLocalStorage("")
    const nftContract = nearStore.nftContract
    console.log(nftContract)
    console.log("Last Res : ", lastRes)

    // The uploaded image which will be deployed through IPFS
    const [uploadImg, setUploadImg] = useState();
    // Ipsf hook with details and upload hook.
    const ipfsData = useIPFS(uploadImg);


    const [profile, setProfile] = useState({
        username: accountId,
        fullName: "",
        aboutMe: "",
        hobbys: "",
        description: "",
    });

    const [profileNFT, setProfileNFT] = useState()

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
        setProfile(() => newProfile);
    }

    async function save() {
        let profileToSave = JSON.parse(JSON.stringify(profile));
        console.log(profileNFT);
        delete profileToSave.follows;
        delete profileToSave.posts;
        if (nearState.tokenContract) {
            registerUserIfNotRegistered(nearState);
        }
    }

    async function handleSave() {
        setProfileNFT(() =>  {return {
            title: profile.fullName,
            description: "AERX ProfileNFT for " + profile.fullName,
            media: ipfsData.fileUrl,
            media_hash: ipfsData.urlSha256,
            // issued_at: "", TODO: today
            extra: profile,
        }})
        //1. Put the values from our fields into a JSON
        // TODO correct metadata
        // const data = JSON.stringify(profile);
        // 2. Check if complete
        // 3. send mint request
        console.log("Near contract : " + window.NFTContract);
        window.CNFTContract.nft_mint({
            receiver_id: accountId,
            token_metadata: JSON.stringify(profileNFT),
        })
        // console.log(lastRes);
        // setUploadImg(fetch(lastRes[0].metadata.media));
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
                    lastRes={lastRes}
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
