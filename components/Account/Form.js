import {
    Box,
    Header,
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
import {  useRef, useState } from "react";

export default function CreateProfileForm(props) {
    const inputFile = useRef(null);
    const onButtonClick = () => {
        inputFile.current.click();
        console.log("acup",props.uploadImg);
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
                    <FormLabel>{props.t("label.profilePicture")}</FormLabel>
                    <Box
                        bg={props.picBg}
                        height="320px"
                        rounded="lg"
                        width={["100%", "400px", "225px"]}
                        mb={2}
                    >
                        {props.uploadImg && (
                            <ChakraImage
                                height="320px"
                                rounded="lg"
                                maxWidth={["100%", "400px", "225px"]}
                                margin="0 auto"
                                src={URL.createObjectURL(props.uploadImg)}
                                alt="profileImgPreview"
                                objectFit="cover"
                            />
                        )}
                    </Box>

                    {uploadReady ?
                        <Button
                            size="sm"
                            colorScheme={props.uploadImg ? "gray" : "pink"}
                            mb={2}
                            onClick={onButtonClick}
                        >
                            {props.uploadImg
                                ? props.t("label.change")
                                : props.t("label.upload")}
                        </Button>
                        :
                        <Button> IFPS loading ... </Button>
                    }

                    <Box height={0} width={0} opacity={0}>
                        <input
                            ref={inputFile}
                            onChange={props.profileImageChange}
                            //   publicKey="9a62ac3cb175e8d52479"
                            type="file"
                        />
                    </Box>
                </FormControl>
            </Box>

            <Box pl={[0, 0, 1]} pr={8}>
                <FormControl mb={2}>
                    <FormLabel>{props.t("label.fullName")}</FormLabel>
                    <Input
                        type="email"
                        defaultValue={props.profile.fullName}
                        placeholder="fullName"
                        onChange={props.update}
                        data-path="fullName"
                    />
                </FormControl>

                <FormControl mb={2}>
                    <FormLabel>{props.t("label.username")}</FormLabel>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <AtSignIcon color="gray.300" />
                        </InputLeftElement>
                        <Input
                            placeholder="username"
                            defaultValue={props.profile.username}
                            type="text"
                            onChange={props.update}
                            data-path="username"
							readOnly
                        />
                    </InputGroup>
                </FormControl>

                {/* <FormControl mb={2}>
                    <FormLabel>{props.t("label.email")}</FormLabel>
                    <Input
                        type="text"
                        defaultValue={props.profile.email}
                        placeholder="email"
                        onChange={props.update}
                        data-path="email"
                    />
                </FormControl> */}

                <FormControl mb={2}>
                    <FormLabel>{props.t("label.aboutMe")}</FormLabel>
                    <Textarea
                        type="email"
                        defaultValue={props.profile.aboutMe}
                        placeholder="aboutMe"
                        onChange={props.update}
                        data-path="aboutMe"
                    />
                </FormControl>

                <FormControl mb={2}>
                    <FormLabel>{props.t("label.hobbys")}</FormLabel>
                    <Textarea
                        type="email"
                        defaultValue={props.profile.hobbys}
                        placeholder="hobbys"
                        onChange={props.update}
                        data-path="hobbys"
                    />
                </FormControl>

                <FormControl mb={2}>
                    <FormLabel>{props.t("label.city")}</FormLabel>
                    <Input
                        placeholder="city"
                        defaultValue={props.profile.city}
                        onChange={props.update}
                        data-path="city"
                    />
                </FormControl>

                {/* <FormControl mb={2}>
                    <FormLabel>{props.t("label.state")}</FormLabel>
                    <Input
                        placeholder="State/Province"
                        defaultValue={props.profile.state}
                        onChange={props.update}
                        data-path="state"
                    />
                </FormControl> */}

                <FormControl mb={2}>
                    <FormLabel>{props.t("label.country")}</FormLabel>
                    <Input
                        placeholder="Country"
                        defaultValue={props.profile.country}
                        onChange={props.update}
                        data-path="country"
                    />
                </FormControl>

                <Button
                    colorScheme="green"
                    mt={2}
                    size="lg"
                    onClick={props.save}
                >
                    {props.t("label.save")}
                </Button>
            </Box>
        </Grid>
    );
}
