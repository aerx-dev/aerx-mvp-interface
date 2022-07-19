import React from "react";
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Textarea,
    Image,
    Grid,
} from "@chakra-ui/react";
import { AtSignIcon } from "@chakra-ui/icons";
import { ProfileType } from "@/types/stores";
import { Translate } from "next-translate";

export type AccountDataProps = {
    profile: ProfileType;
    t: Translate;
};

const AccountData = ({ profile, t }: AccountDataProps) => {
    console.log("ac", profile);
    return (
        <Grid
            templateColumns={[
                "repeat(100%)",
                "repeat(100%)",
                "220px calc(100% - 200px)",
            ]}
            gap="20px"
        >
            <Box
                overflow={"hidden"}
                rounded="lg"
                maxWidth={["100%", "400px", "225px"]}
                margin="0 auto"
            >
                <FormLabel>{t("label.profilePicture")}</FormLabel>
                <Box
                    // bg={props.picBg}
                    height="320px"
                    rounded="lg"
                    width={["100%", "400px", "225px"]}
                    mb={2}
                >
                    {profile?.profileImg && (
                        <Image
                            height="320px"
                            rounded="lg"
                            maxWidth={["100%", "400px", "225px"]}
                            margin="0 auto"
                            src={profile.profileImg}
                            alt="profileImgPreview"
                            objectFit="cover"
                        />
                    )}
                </Box>
            </Box>
            <Box>
                <FormControl mb={2}>
                    <FormLabel>{t("label.fullName")}</FormLabel>
                    <Input
                        type="text"
                        defaultValue={profile.fullName}
                        readOnly
                    />
                </FormControl>

                <FormControl mb={2}>
                    <FormLabel>{t("label.username")}</FormLabel>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <AtSignIcon color="gray.300" />
                        </InputLeftElement>
                        <Input
                            defaultValue={profile.username}
                            type="text"
                            readOnly
                        />
                    </InputGroup>
                </FormControl>

                <FormControl mb={2}>
                    <FormLabel>{t("label.aboutMe")}</FormLabel>
                    <Textarea defaultValue={profile.aboutMe} readOnly />
                </FormControl>

                <FormControl mb={2}>
                    <FormLabel>{t("label.hobbys")}</FormLabel>
                    <Textarea defaultValue={profile.hobbys} readOnly />
                </FormControl>

                <FormControl mb={2}>
                    <FormLabel>{t("label.city")}</FormLabel>
                    <Input type="text" defaultValue={profile.city} readOnly />
                </FormControl>

                <FormControl mb={2}>
                    <FormLabel>{t("label.country")}</FormLabel>
                    <Input
                        type="text"
                        defaultValue={profile.country}
                        readOnly
                    />
                </FormControl>
            </Box>
        </Grid>
    );
};

export default AccountData;
