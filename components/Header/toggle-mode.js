import { IconButton, useColorMode } from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";

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
      variant={"outline"}
    >
      {colorMode === "light" ? <IoSunnyOutline /> : <IoMoonOutline />}
    </IconButton>
  );
}

export default ToggleMode;
