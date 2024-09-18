import React from "react";
import ButtonLogout from "../ButtonLogout";
import {
  Avatar,
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function UserLogged({
  avatar,
  name,
  role,
}: {
  avatar: string;
  name: string;
  role: string;
}) {
  return (
    <Menu>
      <MenuButton>
        <Stack direction="row" spacing="10px" alignItems="center">
          <Avatar name={name} src={avatar} size={["sm", "sm", "md", "md"]} />
          <Box display={["none", "none", "block", "block"]}>
            <Flex direction="column" alignItems="start">
              <Text color="bma.primary" fontWeight="700" fontSize="14px">
                {name}
              </Text>
              <Text fontSize="12px" color="grey">
                {role}
              </Text>
            </Flex>
          </Box>
          <Box color={["white", "white", "black", "black"]}>
            <Icon icon="bx:chevron-down" fontSize="20px" />
          </Box>
        </Stack>
      </MenuButton>
      <MenuList>
        <ButtonLogout />
      </MenuList>
    </Menu>
  );
}
