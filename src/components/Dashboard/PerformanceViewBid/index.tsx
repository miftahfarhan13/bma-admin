import { Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import ButtonLive from "../../AppComponents/ButtonLive";
import dynamic from "next/dynamic";

const PerformanceViewBidHistorical = dynamic(
  () => import("../PerformanceViewBid/PerformanceViewBidHistorical")
);
const PerformanceViewBidLive = dynamic(
  () => import("../PerformanceViewBid/PerformanceViewBidLive")
);

export default function PerformanceViewBid() {
  const [isLive, setIsLive] = useState(false);
  return (
    <Stack direction="column" spacing="10px">
      <Stack direction="row" spacing="10px" alignItems="center">
        <Text fontWeight="700">Performance Views & Bids</Text>
        <ButtonLive isLive={isLive} onClick={() => setIsLive(!isLive)} />
      </Stack>

      {isLive ? (
        <>
          <PerformanceViewBidLive />
        </>
      ) : (
        <>
          <PerformanceViewBidHistorical />
        </>
      )}
    </Stack>
  );
}
