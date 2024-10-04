import ButtonLive from "@/components/AppComponents/ButtonLive";
import { Box, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import MostViewedCarHistorical from "./MostViewedCarHistorical";
import MostViewedCarLive from "./MostViewedCarLive";

export default function MostViewedCar() {
  const [isLive, setIsLive] = useState(false);

  return (
    <Stack
      position="relative"
      direction="column"
      spacing="10px"
    >
      <Box
        position={
          isLive ? "static" : ["static", "static", "absolute", "absolute"]
        }
        mb={["20px", "20px", "0px", "0px"]}
        top={0}
        left={0}
      >
        <ButtonLive isLive={isLive} onClick={() => setIsLive(!isLive)} />
      </Box>

      {isLive ? (
        <>
          <MostViewedCarLive />
        </>
      ) : (
        <>
          <MostViewedCarHistorical />
        </>
      )}
    </Stack>
  );
}
