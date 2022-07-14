import { Box, Input, useColorMode, useColorModeValue } from "@chakra-ui/react";
import useCustomToast from "../hooks/useCustomToast";
import { SearchIconButton } from "./UI/IconButton";
import { useState, useEffect, useRef } from "react";
import { nearStore } from "../stores/near";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

function SearchProfile({ bg }) {
    const nearState = nearStore((state) => state);
    // const [balance, setBalance] = useState(0);
    const toast = useCustomToast();
    const router = useRouter();
    const [sbody, setSbody] = useState({
        text: "",
    });

    const { t } = useTranslation("profile");
    const { colorMode } = useColorMode();
    const filter = colorMode === "light" ? "invert(0)" : "invert(0)";
    const fill = useColorModeValue("gray", "white");

    async function searchenter() {
        if (!sbody.text) {
            toast("warning", "search cannot be empty!", "searchpage");
            return;
        }
        try {
            window.location.replace(
                window.location.origin + "/search?id=" + sbody.text,
            );
        } catch (e) {
            console.log("search Error! Error: " + e.message);
        }
    }

    // Reffs to the content data

    function update(e) {
        const path = e.currentTarget.dataset.path;
        const val = e.currentTarget.value;
        setSbody((prevSbody) => {
            return {
                ...prevSbody,
                [path]: val,
            };
        });
    }

    // ! since refresh is a function itself it can be called directly once
    // to avoid it running more than once inside a useEffects
    // function clickRefresh() {
    //     if (!refresh) {
    //         setRefresh(true);
    //     }
    // }

    return (
        <Box
            flexDirection="row"
            display="flex"
            alignItems="center"
            bg={bg}
            px={4}
            py={2}
            borderRadius={5}
            className="sticky top-20 z-10 shadow-lg"
        >
            <Input
                onChange={update}
                maxLength={500}
                type="text"
                data-path="text"
                placeholder={t("search")}
                borderRadius={20}
                filter={filter}
                size="sm"
                border="none"
                bg={useColorModeValue("white", "#1B1D1E")}
            />

            <Box onClick={searchenter} ml={3}>
                <SearchIconButton />
            </Box>
        </Box>
    );
}

export default SearchProfile;
