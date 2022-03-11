import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  IconButton,
} from "@chakra-ui/react";

import { HiOutlineMenu } from "react-icons/hi";
import useTranslation from "next-translate/useTranslation";
import { useRef } from "react";

function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { t } = useTranslation("header");

  return (
    <>
      <IconButton
        aria-label={t("ariaSidebar")}
        variant={"outline"}
        _hover={{ bg: "none" }}
        _active={{ bg: "none" }}
        rounded="full"
        ref={btnRef}
        fontSize={"lg"}
        onClick={onOpen}
      >
        <HiOutlineMenu />
      </IconButton>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody></DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Sidebar;
