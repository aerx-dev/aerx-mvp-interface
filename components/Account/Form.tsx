import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    InputGroup,
    InputLeftElement,
    Image as ChakraImage,
    Grid,
} from "@chakra-ui/react";
import { AtSignIcon } from "@chakra-ui/icons";
import { ChangeEvent, useRef, useState } from "react";
import { Translate } from "next-translate";
import { ProfileType } from "@/types/stores";

export type ProfileFormProps = {
    t: Translate;
    picBg: string;
    profile: ProfileType;
    uploadImg: File | undefined;
    profileImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleUpdate: (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void;
    handleSave: (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => Promise<void>;
};

const ProfileForm = ({
    t,
    picBg,
    profile,
    uploadImg,
    handleUpdate,
    handleSave,
    profileImageChange,
}: ProfileFormProps) => {
    const inputFile = useRef<HTMLInputElement>(null);

    const onButtonClick = () => {
        inputFile.current?.click();
        console.log("acup uploadImg", uploadImg);
    };

    // TODO Only show upload BUtton if IPFS is ready
    const [uploadReady, setUploadReady] = useState(true);

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
                <FormControl mb={2}>
                    <FormLabel>{t("label.profilePicture")}</FormLabel>
                    <Box
                        bg={picBg}
                        height="320px"
                        rounded="lg"
                        width={["100%", "400px", "225px"]}
                        mb={2}
                    >
                        {uploadImg && (
                            <ChakraImage
                                height="320px"
                                rounded="lg"
                                maxWidth={["100%", "400px", "225px"]}
                                margin="0 auto"
                                src={URL.createObjectURL(uploadImg)}
                                alt="profileImgPreview"
                                objectFit="cover"
                            />
                        )}
                    </Box>

                    {uploadReady ? (
                        <Button
                            size="sm"
                            colorScheme={uploadImg ? "gray" : "pink"}
                            mb={2}
                            onClick={onButtonClick}
                        >
                            {uploadImg ? t("label.change") : t("label.upload")}
                        </Button>
                    ) : (
                        <Button> IFPS loading ... </Button>
                    )}

                    <Box height={0} width={0} opacity={0}>
                        <input
                            ref={inputFile}
                            onChange={profileImageChange}
                            //   publicKey="9a62ac3cb175e8d52479"
                            type="file"
                        />
                    </Box>
                </FormControl>
            </Box>

            <Box pl={[0, 0, 1]} pr={8}>
                <FormControl mb={2}>
                    <FormLabel>{t("label.fullName")}</FormLabel>
                    <Input
                        defaultValue={profile.fullName}
                        placeholder="fullName"
                        onChange={handleUpdate}
                        name="fullName"
                    />
                </FormControl>

                <FormControl mb={2}>
                    <FormLabel>{t("label.username")}</FormLabel>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <AtSignIcon color="gray.300" />
                        </InputLeftElement>
                        <Input
                            placeholder="username"
                            defaultValue={profile.username}
                            onChange={handleUpdate}
                            name="username"
                        />
                    </InputGroup>
                </FormControl>

                <FormControl mb={2}>
                    <FormLabel>{t("label.aboutMe")}</FormLabel>
                    <Input
                        defaultValue={profile.aboutMe}
                        placeholder="aboutMe"
                        onChange={handleUpdate}
                        name="aboutMe"
                    />
                </FormControl>

                <FormControl mb={2}>
                    <FormLabel>{t("label.hobbys")}</FormLabel>
                    <Textarea
                        defaultValue={profile.hobbys}
                        placeholder="hobbys"
                        onChange={handleUpdate}
                        name="hobbys"
                    />
                </FormControl>

                <FormControl mb={2}>
                    <FormLabel>{t("label.city")}</FormLabel>
                    <Input
                        placeholder="city"
                        defaultValue={profile.city}
                        onChange={handleUpdate}
                        name="city"
                    />
                </FormControl>

                <FormControl mb={2}>
                    <FormLabel>{t("label.country")}</FormLabel>
                    <Input
                        placeholder="Country"
                        defaultValue={profile.country}
                        onChange={handleUpdate}
                        name="country"
                    />
                </FormControl>

                <Button
                    colorScheme="green"
                    mt={2}
                    size="lg"
                    onClick={handleSave}
                >
                    {t("label.save")}
                </Button>
            </Box>
        </Grid>
    );
};

export default ProfileForm;
