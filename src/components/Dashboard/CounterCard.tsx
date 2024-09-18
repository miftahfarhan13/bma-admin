import { Box, Stack, Text } from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

export default function CounterCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <Box borderRadius="8px" border="1px solid #DBDBDB" p="10px">
      <Stack direction="row" alignItems="center" spacing="10px">
        <Box
          minW={["24px", "24px", "40px", "40px"]}
          fontSize={["24px", "24px", "40px", "40px"]}
          color="bma.primary"
        >
          <Icon icon={icon} />
        </Box>
        <Stack direction="column" alignItems="start" spacing="0px">
          <Text fontWeight="700" fontSize={["14px", "14px", "16px", "16px"]}>
            {label}
          </Text>
          <Text fontSize={["16px", "16px", "20px", "20px"]} fontWeight="800">
            {value}
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
}
