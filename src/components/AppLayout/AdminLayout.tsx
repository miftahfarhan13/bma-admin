import { Box, Flex, Skeleton, Stack, Text } from "@chakra-ui/react";
import React from "react";
import useGetMe from "@/utils/hooks/useGetMe";
import UserLogged from "./UserLogged";
import Menus from "./Menus";
import MenuMobile from "./MenuMobile";

export default function AdminLayout({
  name,
  pageName,
  children,
}: {
  name: string;
  pageName: string;
  children: any;
}) {
  const { user, isLoading } = useGetMe();
  const menus = [
    {
      link: "/",
      icon: "bxs:dashboard",
      name: "Biding Performance",
    },
    {
      link: "/bd-performance",
      icon: "bxs:group",
      name: "BD Performance",
    },
    {
      link: "/bidding",
      icon: "bxs:book-content",
      name: "Bidding Information",
    },
    {
      link: "/car",
      icon: "bxs:car",
      name: "Car",
    },
  ];
  return (
    <Flex direction="row">
      <Box
        display={["none", "none", "block", "block"]}
        minW="255px"
        minH="100dvh"
        boxShadow="0px 1px 4px 0px #00000040"
      >
        <Menus menus={menus} name={name} />
      </Box>
      <Box width="100%">
        <Box
          padding={["10px", "10px", "20px", "20px"]}
          bg={["bma.primary", "bma.primary", "transparent", "transparent"]}
          shadow="md"
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            width="100%"
            alignItems="center"
          >
            <Stack direction="row" alignItems="center" spacing="10px">
              <Box display={["block", "block", "none", "none"]}>
                <MenuMobile menus={menus} name={name} />
              </Box>
              <Text
                fontSize={["18px", "18px", "24px", "24px"]}
                fontWeight="700"
                color={["white", "white", "bma.primary", "bma.primary"]}
              >
                {pageName}
              </Text>
            </Stack>
            {isLoading ? (
              <>
                <Skeleton w="140px" h="48px" />
              </>
            ) : (
              <>
                <UserLogged
                  avatar=""
                  name={user?.name}
                  role={user?.roles[0]?.name}
                />
              </>
            )}
          </Stack>
        </Box>
        <Box
          p={["20px", "20px", "20px", "20px"]}
          maxH="calc(100dvh - 88px)"
          overflowY="auto"
          maxW={["100%", "100%", "calc(100vw - 255px)", "calc(100vw - 255px)"]}
        >
          {children}
        </Box>
      </Box>
    </Flex>
  );
}
