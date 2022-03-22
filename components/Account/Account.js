import React from "react";
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Textarea,
} from "@chakra-ui/react";
import { AtSignIcon } from "@chakra-ui/icons";

function AccountData({ profile, t }) {
    return (
        <Box>
            <FormControl mb={2}>
                <FormLabel>{t("label.fullName")}</FormLabel>
                <Input type="text" defaultValue={profile.fullName} readOnly />
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
                <Textarea type="text" defaultValue={profile.aboutMe} readOnly />
            </FormControl>

            <FormControl mb={2}>
                <FormLabel>{t("label.hobbys")}</FormLabel>
                <Textarea type="text" defaultValue={profile.hobbys} readOnly />
            </FormControl>

            <FormControl mb={2}>
                <FormLabel>{t("label.city")}</FormLabel>
                <Input type="text" defaultValue={profile.city} readOnly />
            </FormControl>

            <FormControl mb={2}>
                <FormLabel>{t("label.country")}</FormLabel>
                <Input type="text" defaultValue={profile.country} readOnly />
            </FormControl>
        </Box>
    );
}

export default AccountData;
