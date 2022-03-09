import Layout from "../Layout";
import {
    Box,
    Heading,
    Image as ChakraImage,
    useColorModeValue,
} from "@chakra-ui/react";
import { profileStore } from "../../stores/profile";
import useTranslation from "next-translate/useTranslation";
import { useRef, useState, useEffect, useReducer } from "react";
import { getTotalSupply, sendToken } from "../../lib/tokenContract";
import { createUserProfileNFT } from "../../lib/NFTContract";
import { registerUserIfNotRegistered } from "../../lib/auth";
import { nearStore } from "../../stores/near";
import CreateProfileForm from "./Form";
// import content2ipfs from "../pages/api/uploadProfileNFT"
import IpfsComponent from "../ipfs";

const Account = () => {

    // The profile picture which will go into the NFT
    const [profile, setProfile] = useState({
        username: "",
        email: "",
        fullName: "",
        aboutMe: "",
        profileImgCid: "",
    });

    // The uploaded image which will be deployed through IPFS
    const [uploadImg, setUploadImg] = useState();

    const nearState = nearStore((profile) => profile);

    const profileId = nearState.accountId; //"samullman.testnet"
    const [profileLoaded, setProfileLoaded] = useState(false);

    const { t } = useTranslation("account");
    const picBg = useColorModeValue("gray.200", "gray.700");

    // useEffect(() => {
    //     // const { cid, size } = content2ipfs(() => uploadImg)
    //     const { cid, size } = upload(() => uploadImg)
    //     console.log(size)
    //     console.log(cid);
    //     setProfile((prevProfile) => {
    //         return {
    //             ...prevProfile,
    //             profileImgCid: cid,
    //         }
    //     })
    //     // console.log(profile)
    // }, [uploadImg])

    function profileImageChange(event) {
        const { files } = event.target;
        if (files && files.length) {
            console.log(files);
            const filename = files[0].name;

            var parts = filename.split(".");
            const fileType = parts[parts.length - 1];

            // TODO assert that it is a image file
            console.log("fileType", fileType); //ex: zip, rar, jpg, svg etc.
            setUploadImg(event.target.files[0]);
            // document.querySelectorAll(".profile-picture")[0].value = info.cdnUrl;
            // console.log(JSON.stringify(uploadImg))

        }
    }

    function update(e) {
        let path = e.currentTarget.dataset.path;
        let newProfile = profile;
        newProfile[path] = e.currentTarget.value;
        setProfile(newProfile);
    }

    async function save() {
        let profileToSave = JSON.parse(JSON.stringify(profile));
        console.log(profileToSave);
        delete profileToSave.follows;
        delete profileToSave.posts;
        if (nearState.tokenContract) {
            registerUserIfNotRegistered(nearState);
        }
    }

    async function handleSave() {
        //1. Put the values from our fields into a JSON
        const data = JSON.stringify(profile);
        //2. Send the json over to IPFS & get the link for the data
        await fetch("/api/ipfs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        })
            .then((response) => response.json())
            //3. Put the link to JSON's ipfs into NFTTokenMetadata object
            .then((data) => createUserProfileNFT(nearState, profileId, data.uri)); // use the returned content uri
    }


    return (
        <Layout>
            <Box className="px-4 md:px-10" py={2} maxWidth={1100} margin="0 auto">
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
                    save={save}
                />
                {/* <Button colorScheme="green" mt={2} size="lg" onClick={handleSave}>
          {t('label.save')}
        </Button> */}
        <IpfsComponent state={uploadImg}/>
            </Box>
        </Layout>
    );
};

export default Account;
