import Layout from "../Layout";
import {
    Box,
    Button,
    Heading,
    useColorModeValue,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import {  useState, useEffect } from "react";
import { nearStore } from "../../stores/near";
import CreateProfileForm from "./Form";
import useIPFS from "../../hooks/useIPFS";
import useCustomToast from "../../hooks/useCustomToast";


const Account = () => {
    // The profile picture which will go into the NFT

    const { t } = useTranslation("account");
    const picBg = useColorModeValue("gray.200", "gray.700");
    const nearState = nearStore((state) => state);
    const pnftContract = nearState.pnftContract;
    const toast = useCustomToast()

    // The uploaded image which will be deployed through IPFS
    const [uploadImg, setUploadImg] = useState();
    // Ipsf hook with details and upload hook.
    const ipfsData = useIPFS(uploadImg, toast);


    const [profile, setProfile] = useState({
        username: nearState.accountId,
        fullName: "",
        aboutMe: "",
        hobbys: "",
        city: "",
        country: "",
        ...nearState.profile
    });
    // User has no profileNFT yet
    const [noProfile, setNoProfile] = useState(true)

    useEffect(() => {
        async function checkProfile() {

            if (nearState.accountId && nearState.pnftContract && noProfile) {
                const pnftContract = nearState.pnftContract
                const numPnft = await pnftContract.nft_supply_for_owner({ account_id: nearState.accountId })
                console.log("Number of ProfileNFTs : " + numPnft)
                if (parseInt(numPnft) > 0) {
                    const profileNft = await pnftContract.nft_tokens_for_owner({ account_id: nearState.accountId })
                    console.log(profileNft)
                    // If the NFT has Media, grab it!
                    if (profileNft[0].metadata.media) {
                        let fetchedImg = profileNft[0].metadata.media
                        nearState.setProfile({
                                ...nearState.profile,
                                profileImg: fetchedImg,
                            })
                        console.log("Fetched profileImg!", fetchedImg)
                    }
                    if (profileNft[0].metadata.extra) {
                        const parsedProfile = JSON.parse(profileNft[0].metadata.extra)
                        console.log("Fetched ProfileNFT: ", parsedProfile);
                        setNoProfile(false)
                        setProfile((prevProfile) => {
                            return {
                                ...prevProfile,
                                ...parsedProfile,
                            }
                        })
                    }
                } else { setNoProfile(true) }
            }
        }
        checkProfile();
    }, [nearState.accountId, noProfile])


    function profileImageChange(event) {
        const { files } = event.target;
        if (files && files.length) {
            // // TODO assert that it is a image file
            // const filename = files[0].name;
            // var parts = filename.split(".");
            // const fileType = parts[parts.length - 1];
            // console.log("fileType", fileType); //ex: zip, rar, jpg, svg etc.
            setUploadImg(() => event.target.files[0]);
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
            }
        });
    }

    async function handleSave(e) {
        e.preventDefault();
        let profileToSave = {
            title: profile.fullName,
            description: "AERX ProfileNFT for " + profile.fullName,
            media: ipfsData.fileUrl,
            media_hash: ipfsData.urlSha256,
            issued_at: new Date().toString(),
            extra: JSON.stringify(profile),
        };
        
        console.log(profileToSave)
        let fetchedImg = ipfsData.fileUrl ? ipfsData.fileUrl : nearState.profile.profileImg
        nearState.setProfile({
                ...nearState.profile,
                ...profile,
                profileImg: fetchedImg,
        })
        // TODO correct metadata
        // 2. Check if user is registered for tokens. This should happen in the contract.
        // if (nearState.tokenContract) {
        //     registerUserIfNotRegistered(nearState);
        // }

        // 3. send mint request
        try {

            const res = await pnftContract.nft_mint(
                {
                    receiver_id: nearState.accountId,
                    token_metadata: profileToSave,
                },
                "300000000000000", // attached GAS (optional)
                "9640000000000000000011" // attached deposit in yoctoNEAR (optional))
            )
            toast('success', "Your AERX ProfilNFT id: " + res.token_id + " was minted successfully!", "PNFTsccss")
            console.log(res)
        } catch (e) {
            toast('error', "ProfileNFT could not be minted!", "PNFTsccss",)
            console.log("NFT could not be minted! Error: ", e)
        }
    }

    async function onBurn() {
        console.log("BURN")
        const res = 11;
        toast("success", "Your AERX ProfilNFT id: " + res.token_id + " was burned!", "PNFTburn")
        // TODO brun NFT

        setNoProfile(true)
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
                {noProfile ?
                    <CreateProfileForm
                        t={t}
                        picBg={picBg}
                        profile={profile}
                        uploadImg={uploadImg}
                        profileImageChange={profileImageChange}
                        update={update}
                        save={handleSave}
                    />
                    : <Box alignContent="safe center" > <p><pre> {JSON.stringify(profile)} </pre></p>
                        <Button
                            marginTop="10px"
                            marginLeft="11px"
                            colorScheme="red"
                            onClick={onBurn}> Brun Profile </Button>
                    </Box>}
            </Box>
        </Layout>
    );
};

export default Account;
