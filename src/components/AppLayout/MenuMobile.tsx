import { Menu } from "@/utils/interface/menu";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import Menus from "./Menus";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function MenuMobile({
  menus,
  name,
}: {
  menus: Array<Menu>;
  name: string;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        aria-label=""
        onClick={onOpen}
        variant="ghost"
        color="white"
        _hover={{}}
        icon={<Icon icon="bx:menu-alt-left" />}
      ></IconButton>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody>
            <Menus menus={menus} name={name} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
