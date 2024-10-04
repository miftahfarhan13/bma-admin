import useGetMostViewedCar from "@/utils/hooks/dashboard/useGetMostViewedCar";
import { Input, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import TableMostViewedCar from "./TableMostViewedCar";

export default function MostViewedCarHistorical() {
  const [date, setDate] = useState("");

  const { data: mostViewedCar, refetch: refetchMostViewedCar } =
    useGetMostViewedCar({ date });

  return (
    <Stack direction="column" spacing="10px">
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

      <TableMostViewedCar mostViewedCar={mostViewedCar} />
    </Stack>
  );
}
