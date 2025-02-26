import { MenuParent } from "@/utils/interface/menu";
import { Image, Stack, Text } from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import React from "react";

export default function Menus({
  menus,
  name,
}: {
  menus: Array<MenuParent>;
  name: string;
}) {
  return (
    <>
      <Stack direction="column" spacing="40px" padding="20px 20px">
        <Image
          src="/images/logo-bma.png"
          width="200px"
          objectFit="contain"
          alignSelf="center"
        />

        <Stack direction="column" spacing="30px">
          {menus?.map((parent) => (
            <Stack key={parent.title} direction="column" spacing="10px">
              <Text fontWeight="700">{parent?.title}</Text>
              <Stack direction="column" spacing="5px">
                {parent?.menus?.map((menu) => (
                  <Link href={menu.link} key={menu.name}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      borderRadius="10px"
                      padding="10px"
                      bgColor={menu.name === name ? "bma.primary" : ""}
                      color={menu.name === name ? "white" : "bma.primary"}
                      fontWeight={menu.name === name ? "700" : "400"}
                    >
                      <Icon icon={menu.icon} />
                      <Text fontSize=".875rem">{menu.name}</Text>
                    </Stack>
                  </Link>
                ))}
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </>
  );
}
