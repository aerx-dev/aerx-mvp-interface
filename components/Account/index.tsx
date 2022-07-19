import Layout from "../Layout";
import { Box, Button, Heading, useColorModeValue } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { useState, useEffect, ChangeEvent } from "react";
import { nearStore } from "../../stores/near";
import ProfileForm from "./Form";
import usePinata from "../../hooks/usePinata";
import useCustomToast from "../../hooks/useCustomToast";
import AccountData from "./Account";
import { ProfileType } from "@/types/stores";
import { ACCEPTED_FILE_EXTENSIONS } from "@/utils/constants/files";

const Account = () => {
    // The profile picture which will go into the NFT
    const { t } = useTranslation("account");
    const picBg = useColorModeValue("gray.200", "gray.700");
    const nearState = nearStore((state) => state);
    const { pnftContract } = nearState;
    const toast = useCustomToast();

    // The uploaded image which will be deployed through IPFS
    const [uploadImg, setUploadImg] = useState<File>();
    const [lockPage, setLockPage] = useState(true);
    const [updating, setUpdating] = useState(true);

    // Ipsf hook with details and upload hook.
    const ipfsData = usePinata(uploadImg, toast);

    const [profile, setProfile] = useState<ProfileType>({
        ...nearState.profile,
        username: "",
        fullName: "",
        aboutMe: "",
        hobbys: "",
        city: "",
        country: "",
        profileImg: "",
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

    const profileImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        if (!files) return;

        if (files && files.length) {
            console.log("Files : ", files);
            const picname = files[0].name;
            const picPart = picname.split(".");
            const picType = picPart[picPart.length - 1];

            console.log("Pictype : ", picType);

            if (!ACCEPTED_FILE_EXTENSIONS.includes(picType)) {
                return toast(
                    "error",
                    "Picture type not supported. Supported types are " +
                        ACCEPTED_FILE_EXTENSIONS +
                        " .",
                    "Images",
                );
            }

            setUploadImg(files[0]);
        }
    };

    const handleUpdate = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const {
            currentTarget: { name, value },
        } = e;

        setProfile((prevProfile) => {
            return {
                ...prevProfile,
                [name]: value,
            };
        });
    };

    const handleSave = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
        e.preventDefault();

        const profileToSave = {
            title: "AERX ProfileNFT for " + profile.username,
            username: profile.username,
            description: profile.aboutMe,
            media: ipfsData.fileUrl,
            media_hash: ipfsData.urlSha256,
            issued_at: new Date().toISOString(),
            extra: JSON.stringify(profile),
        };

        console.log("profileToSave : ", profileToSave);

        const fetchedImg = ipfsData.fileUrl || nearState.profile?.profileImg;

        nearState.setProfile({
            ...profile,
            profileImg: fetchedImg,
        });

        // 3. send mint request
        let user_info;

        const onMintDelay = () => {
            window.location.replace(window.location.origin + "/profile");
        };

        try {
            if (updating) {
                console.log("Editing.....");
                user_info = await pnftContract?.edit_profile(
                    {
                        user_id: nearState.accountId,
                        new_username: profile.username!,
                        new_details: profileToSave, // TODO: change/check data type for this arg
                    },
                    "30000000000000", // attached GAS (optional)
                );
                toast(
                    "success",
                    "Your AERX ProfileNFT username was changed to : " +
                        user_info.token_id +
                        " successfully along side other details" +
                        "PNFTsccss",
                );
            } else {
                console.log("Minting.....");
                await pnftContract?.mint_profile(
                    {
                        user_id: nearState.accountId,
                        username: profile.username!,
                        token_metadata: profileToSave,
                    },

                    "300000000000000", //attached Gas
                    "1300000000000000000000", // attached Yocto amount
                );
                //no need to await this for now(because if mint_profile run succesfully nft_token will run as well)
                //but just to be sure changes will be made to contract to include nft_token
                // user_info = await pnftContract.nft_token({
                //     token_id: profile.username,
                // });
                toast(
                    "success",
                    "Your AERX ProfileNFT with username: " +
                        profile.username +
                        " was minted successfully!",
                    "PNFTsccss",
                );
            }
            console.log("acres", user_info);
            console.log("extra", nearState.accountId);
            setInterval(onMintDelay, 2000);
        } catch (e) {
            toast(
                "error",
                "ProfileNFT could not be minted or editted!",
                "PNFTsccss",
            );
            console.log("NFT could not be minted or editted! Error: ", e);
        }
    };

    const onEdit = async () => {
        setProfile((prev) => ({
            ...prev,
            ...nearState.profile,
        }));
        setUpdating(true);
        setLockPage(false);
    };

    return (
        <Layout>
            <Box className="px-4 md:px-10 max-w-screen-xl" py={2}>
                <Box className="drop-shadow-xl flex">
                    <Heading as="h1" mb={3}>
                        {t("title")}
                    </Heading>
                    {lockPage && (
                        <Button
                            className="ml-auto"
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
                    <ProfileForm
                        t={t}
                        picBg={picBg}
                        profile={profile}
                        uploadImg={uploadImg}
                        handleSave={handleSave}
                        handleUpdate={handleUpdate}
                        // HERE
                        profileImageChange={profileImageChange}
                    />
                )}
            </Box>
        </Layout>
    );
};

export default Account;
