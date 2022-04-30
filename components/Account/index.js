import Layout from "../Layout";
import { Box, Button, Heading, useColorModeValue } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { useState, useEffect } from "react";
import { nearStore } from "../../stores/near";
import CreateProfileForm from "./Form";
// import useIPFS from "../../hooks/useIPFS";
import usePinata from "../../hooks/usePinata"
import useCustomToast from "../../hooks/useCustomToast";
import AccountData from "./Account";
import { pinFileToIPFS } from "../../lib/ipfsPinata"
import { profileToSupa } from "../../lib/supabaseClient";

const Account = () => {
    // The profile picture which will go into the NFT

    const { t } = useTranslation("account");
    const picBg = useColorModeValue("gray.200", "gray.700");
    const nearState = nearStore((state) => state);
    const pnftContract = nearState.pnftContract;
    const toast = useCustomToast();

    // The uploaded image which will be deployed through IPFS
    const [uploadImg, setUploadImg] = useState();
    const [lockPage, setLockPage] = useState(true);
    const [updating, setUpdating] = useState(true);

    // Ipsf hook with details and upload hook.
    const ipfsData = usePinata(uploadImg, toast);

    const [profile, setProfile] = useState({
        username: nearState.accountId,
        fullName: "",
        aboutMe: "",
        hobbys: "",
        city: "",
        country: "",
        ...nearState.profile,
    });

    useEffect(() => {
        console.log("acns",nearState.profile)
        if (!nearState.profile) {
            setLockPage(false)
            setUpdating(false)
        } else {
            setLockPage(true)
            setUpdating(true)
            setProfile((prevProfile) => {
                return {
                    ...prevProfile,
                    username: nearState.accountId,
                    ...nearState.profile,
                };
            });

        }
    }, [nearState.profile, nearState.accountId])

    function profileImageChange(event) {
        const { files } = event.target;
        if (files && files.length) {
            console.log("Files : ", files)
            // // TODO assert that it is a image file
            // const filename = files[0].name;
            // var parts = filename.split(".");
            // const fileType = parts[parts.length - 1];
            // console.log("fileType", fileType); //ex: zip, rar, jpg, svg etc.
            setUploadImg(files[0]);
        }
    }

    function update(e) {
        let path = e.currentTarget.dataset.path;
        let val = e.currentTarget.value;
        setProfile((prevProfile) => {
            return {
                ...prevProfile,
                username: nearState.accountId,
                [path]: val,
            };
        });
    }

    async function handleSave(e) {
        e.preventDefault();
        let profileToSave = {
            title: profile.fullName,
            username: nearState.accountId,
            description: "AERX ProfileNFT for " + profile.fullName,
            media: ipfsData.fileUrl,
            media_hash: ipfsData.urlSha256,
            issued_at: new Date().toISOString(),
            extra: JSON.stringify(profile),
        };

        let fetchedImg = ipfsData.fileUrl
            ? ipfsData.fileUrl
            : nearState.profile.profileImg;
        nearState.setProfile({
            ...nearState.profile,
            ...profile,
            profileImg: fetchedImg,
        });
        // TODO correct metadata
        // 2. Check if user is registered for tokens. This should happen in the contract.
        // if (nearState.tokenContract) {
        //     registerUserIfNotRegistered(nearState);
        // }

        // 3. send mint request
        try {
            var res;
            if (updating) {
                res = await pnftContract.nft_update_profile(
                    {
                        receiver_id: nearState.accountId,
                        token_metadata: profileToSave,
                    },
                    "300000000000000", // attached GAS (optional)
                    "9990000000000000000011", // attached deposit in yoctoNEAR (optional))
                );
            } else {
                res = await pnftContract.nft_mint(
                    {
                        receiver_id: nearState.accountId,
                        token_metadata: profileToSave,
                    },
                    "300000000000000", // attached GAS (optional)
                    "9990000000000000000011", // attached deposit in yoctoNEAR (optional))
                );
            }
            toast(
                "success",
                "Your AERX ProfilNFT id: " +
                res.token_id +
                " was minted successfully!",
                "PNFTsccss",
            );
            console.log("acres",res);

            profileToSupa(res, toast)

        } catch (e) {
            toast("error", "ProfileNFT could not be minted!", "PNFTsccss");
            console.log("NFT could not be minted! Error: ", e);
        }
    }

    async function onBurn() {
        setProfile(() => {
            return {
                ...nearState.profile,
                username: nearState.accountId,
            }
        })
        setUpdating(true)
        setLockPage(false)
        // nearState.setProfile(null);
    }

    return (
        <Layout>
            <Box
                className="px-4 md:px-10 max-w-screen-xl"
                py={2}
            >
                <Box className="drop-shadow-xl flex">
                    <Heading as="h1" mb={3}>
                        {t("title")}
                    </Heading>
                    {lockPage &&
                        <Button
                            className=" ml-auto"
                            colorScheme="blue"
                            onClick={onBurn}
                        >
                            Update Profile
                        </Button>
                    }
                </Box>
                {lockPage ? (
                    <Box >
                        <Box alignContent="safe center">
                            <AccountData profile={profile} t={t} />

                        </Box>
                    </Box>
                ) : (
                    <CreateProfileForm
                        t={t}
                        picBg={picBg}
                        profile={profile}
                        uploadImg={uploadImg}
                        profileImageChange={profileImageChange}
                        update={update}
                        save={handleSave}
                    />
                )}
            </Box>
        </Layout>
    );
};

export default Account;
