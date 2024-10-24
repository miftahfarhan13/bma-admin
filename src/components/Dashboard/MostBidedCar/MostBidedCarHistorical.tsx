import { Box, Input, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import TableMostBidedCar from "./TableMostBidedCar";
import useGetMostBidedCar from "@/utils/hooks/dashboard/useGetMostBidedCar";
import { useRecoilValue } from "recoil";
import { roleState } from "@/atom/role";

export default function MostBidedCarHistorical() {
  const role = useRecoilValue(roleState);
  const isAdmin = role === "super-admin" || role === "admin";

  const [date, setDate] = useState("");

  const { data: mostBidedCar, refetch: refetchMostBidedCar } =
    useGetMostBidedCar({ date });

  return (
    <Stack direction="column" spacing="10px">
      {isAdmin ? (
        <Input
          w="fit-content"
          value={date}
          onChange={(event) => {
            setDate(event?.target?.value);
            refetchMostBidedCar(event?.target?.value);
          }}
          type="date"
          alignSelf="end"
        />
      ) : (
        <Box h="40px" />
      )}

      <TableMostBidedCar mostBidedCar={mostBidedCar} />
    </Stack>
  );
}
