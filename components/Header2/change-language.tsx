import i18Config from "../../i18n.json";
import useTranslation from "next-translate/useTranslation";
import setLanguage from "next-translate/setLanguage";

import { useRouter } from "next/router";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    useColorMode,
} from "@chakra-ui/react";

const { locales } = i18Config;

export default function ChangeLanguage() {
    const { t, lang } = useTranslation("common");
    const { asPath } = useRouter();
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Menu size="xs">
            <MenuButton
                _hover={{ bg: "none" }}
                _active={{ bg: "none" }}
                fontSize="sm"
                as={IconButton}
                rounded="full"
                variant={colorMode === "light" ? "ghost" : "ghost"}
                color={colorMode === "light" ? "gray" : "white"}
            >
                {lang.toUpperCase()}
            </MenuButton>

            <MenuList color="gray" maxWidth={"100px"}>
                <MenuItem onClick={async () => await setLanguage("en")}>
                    {t("english")}{" "}
                    <small style={{ marginLeft: 8 }}>
                        <b>en</b>
                    </small>
                </MenuItem>
                <MenuItem onClick={async () => await setLanguage("es")}>
                    {t("spanish")}{" "}
                    <small style={{ marginLeft: 8 }}>
                        <b>sp</b>
                    </small>
                </MenuItem>
                <MenuItem onClick={async () => await setLanguage("ru")}>
                    {t("russian")}{" "}
                    <small style={{ marginLeft: 8 }}>
                        <b>ru</b>
                    </small>
                </MenuItem>
            </MenuList>
        </Menu>
    );
}
