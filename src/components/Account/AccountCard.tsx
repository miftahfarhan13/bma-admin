import useGetAccountById from "@/utils/hooks/account/useGetAccountById";
import { Avatar, Box, Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";

export default function AccountCard({ id }: { id: string }) {
  const { data } = useGetAccountById({ id });
  return (
    <Box shadow="md" p="10px" borderRadius="10px" border="1px solid">
      <Stack direction="row" alignItems="center" spacing="10px">
        <Avatar name={data?.name} />
        <Flex direction="column">
          <Text fontSize="12px">Nama BD</Text>
          <Text fontWeight="700">{data?.name}</Text>
        </Flex>
      </Stack>
    </Box>
  );
}
