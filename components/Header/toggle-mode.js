import { IconButton, useColorMode } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { IoMoon } from "react-icons/io5";
import { LightIcon } from "../UI/NavbarIcons";

function ToggleMode() {
    const { colorMode, toggleColorMode } = useColorMode();
    const { t } = useTranslation("header");

    return (
        <IconButton
            onClick={toggleColorMode}
            aria-label={t("ariaToggle")}
            fontSize="lg"
            _hover={{ bg: "none" }}
            _active={{ bg: "none" }}
            rounded="full"
            variant={"ghost"}
            filter={colorMode === "light" ? "invert(0.7)" : "none"}
        >
            {colorMode === "light" ? <IoMoon /> : <LightIcon />}
        </IconButton>
    );
}

export default ToggleMode;
