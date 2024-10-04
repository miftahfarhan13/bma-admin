import { Input, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import TableMostBidedCar from "./TableMostBidedCar";
import useGetMostBidedCar from "@/utils/hooks/dashboard/useGetMostBidedCar";

export default function MostBidedCarHistorical() {
  const [date, setDate] = useState("");

  const { data: mostBidedCar, refetch: refetchMostBidedCar } =
    useGetMostBidedCar({ date });

  return (
    <Stack direction="column" spacing="10px">
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

      <TableMostBidedCar mostBidedCar={mostBidedCar} />
    </Stack>
  );
}
