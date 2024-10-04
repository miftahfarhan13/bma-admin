import { SimpleGrid, Stack, Text } from "@chakra-ui/react";
import React from "react";
import MostViewedCar from "./MostViewedCar/MostViewedCar";
import MostBidedCar from "./MostBidedCar/MostBidedCar";

export default function TopPerformanceCar() {
  return (
    <Stack direction="column" spacing="10px">
      <Text fontWeight="700">Top Performance Car</Text>
      <SimpleGrid columns={[1, 1, 1, 2]} gap="20px">
        <MostViewedCar />
        <MostBidedCar />
      </SimpleGrid>
    </Stack>
  );
}
