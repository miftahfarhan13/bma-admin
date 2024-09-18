import { Box, Stack } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export default function TabDashboard({ name }: { name: string }) {
  const tabs = [
    {
      link: "/",
      name: "Live Performance Car",
    },
    {
      link: "/dashboard/bd-performance",
      name: "BD & Dealer Performance",
    },
  ];
  return (
    <Stack direction="row" alignItems="center" spacing="20px">
      {tabs?.map((tab) => (
        <Link href={tab.link} key={tab.link}>
          <Box
            color={name === tab?.name ? "bma.primary" : "bma.black3"}
            borderBottom={name === tab?.name ? "2px solid #ED1C29" : ""}
            fontWeight={name === tab?.name ? "700" : "400"}
            fontSize={['14px', '14px', '16px', '16px']}
          >
            {tab?.name}
          </Box>
        </Link>
      ))}
    </Stack>
  );
}
