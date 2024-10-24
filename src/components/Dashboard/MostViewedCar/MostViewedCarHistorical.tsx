import useGetMostViewedCar from "@/utils/hooks/dashboard/useGetMostViewedCar";
import { Box, Input, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import TableMostViewedCar from "./TableMostViewedCar";
import { useRecoilValue } from "recoil";
import { roleState } from "@/atom/role";

export default function MostViewedCarHistorical() {
  const role = useRecoilValue(roleState);
  const isAdmin = role === "super-admin" || role === "admin";

  const [date, setDate] = useState("");

  const { data: mostViewedCar, refetch: refetchMostViewedCar } =
    useGetMostViewedCar({ date });

  return (
    <Stack direction="column" spacing="10px">
      {isAdmin ? (
        <Input
          w="fit-content"
          value={date}
          onChange={(event) => {
            setDate(event?.target?.value);
            refetchMostViewedCar(event?.target?.value);
          }}
          type="date"
          alignSelf="end"
        />
      ) : (
        <Box h="40px" />
      )}

      <TableMostViewedCar mostViewedCar={mostViewedCar} />
    </Stack>
  );
}
