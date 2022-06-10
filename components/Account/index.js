import Layout from "../Layout";
import { Box, Button, Heading, useColorModeValue } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { useState, useEffect } from "react";
import { nearStore } from "../../stores/near";
import CreateProfileForm from "./Form";
import usePinata from "../../hooks/usePinata";
import useCustomToast from "../../hooks/useCustomToast";
import AccountData from "./Account";
import { pinFileToIPFS } from "../../lib/ipfsPinata";
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
        username: "",
        fullName: "",
        aboutMe: "",
        hobbys: "",
        city: "",
        country: "",
        ...nearState.profile,
    });

    useEffect(() => {
        console.log("acns", nearState.profile);
        if (!nearState.profile) {
            setLockPage(false);
            setUpdating(false);
        } else {
            setLockPage(true);
            setUpdating(true);
            setProfile((prevProfile) => {
                return {
                    ...prevProfile,
                    ...nearState.profile,
                };
            });
        }
    }, [nearState.profile, nearState.accountId]);

    function profileImageChange(event) {
        const { files } = event.target;
        const expectedType = [
            "jpg",
            "png",
            "apng",
            "jpeg",
            "jfif",
            "pjpeg",
            "pjp",
            "gif",
        ];
        if (files && files.length) {
            console.log("Files : ", files);
            const picname = files[0].name;
            let picPart = picname.split(".");
            const picType = picPart[picPart.length - 1];
            var imagingtype = expectedType.toString()
            if (expectedType.includes(picType)) {
                setUploadImg(files[0]);
                console.log("Pictype : ", picType);
            } else {
                toast(
                    "Picture type not supported. Supported types are:" +
                        imagingtype + ".",
                );
            }
        }
    }

    function update(e) {
        let path = e.currentTarget.dataset.path;
        let val = e.currentTarget.value;
        setProfile((prevProfile) => {
            return {
                ...prevProfile,
                [path]: val,
            };
        });
    }

    async function handleSave(e) {
        e.preventDefault();
        let profileToSave = {
            title: profile.fullName,
            username: profile.username,
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

        // 3. send mint request
        var user_info;
        var last_info;
        try {
            if (updating) {
                last_info = await pnftContract.user_by_acct_id({
                    account_id: nearState.accountId,
                });
                console.log("Editing.....");
                user_info = await pnftContract.edit_profile(
                    {
                        new_username: profile.username,
                        content: profileToSave,
                    },
                    "300000000000000", // attached GAS (optional)
                );
                toast(
                    "success",
                    "Your AERX ProfilNFT username: " +
                        last_info.token_id +
                        " was changed to: " +
                        user_info.token_id +
                        "successfully along side other details" +
                        "PNFTsccss",
                );
            } else {
                console.log("Minting.....");
                await pnftContract.mint_profile(
                    {
                        username: profile.username,
                        token_metadata: profileToSave,
                    },

                    "300000000000000", // attached GAS (optional)
                );
                user_info = await pnftContract.user_by_acct_id({
                    account_id: nearState.accountId,
                });
                toast(
                    "success",
                    "Your AERX ProfilNFT username: " +
                        user_info.token_id +
                        " was minted successfully!",
                    "PNFTsccss",
                );
            }

            console.log("acres", user_info);
            console.log("extra", nearState.accountId);
            profileToSupa(user_info, profile, profileToSave, toast);
        } catch (e) {
            toast(
                "error",
                "ProfileNFT could not be minted or editted!",
                "PNFTsccss",
            );
            console.log("NFT could not be minted or editted! Error: ", e);
        }
    }

    async function onEdit() {
        setProfile(() => {
            return {
                ...nearState.profile,
            };
        });
        setUpdating(true);
        setLockPage(false);
        // nearState.setProfile(null);
    }

    return (
        <Layout>
            <Box className="px-4 md:px-10 max-w-screen-xl" py={2}>
                <Box className="drop-shadow-xl flex">
                    <Heading as="h1" mb={3}>
                        {t("title")}
                    </Heading>
                    {lockPage && (
                        <Button
                            className=" ml-auto"
                            colorScheme="blue"
                            onClick={onEdit}
                        >
                            Update Profile
                        </Button>
                    )}
                </Box>
                {lockPage ? (
                    <Box>
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
