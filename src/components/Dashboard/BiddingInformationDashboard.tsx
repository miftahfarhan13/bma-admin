import { Stack, Text } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import ButtonLive from "../AppComponents/ButtonLive";

const BiddingInformationHistorical = dynamic(
  () => import("@/components/Bidding/BiddingInformationHistorical")
);

const BiddingInformationLiveOnly = dynamic(
  () => import("@/components/Bidding/BiddingInformationLiveOnly")
);

export default function BiddingInformationDashboard() {
  const [isLive, setIsLive] = useState(false);

  return (
    <>
      <Stack direction="column" spacing="10px">
        <Text fontWeight="700">Bidding Information</Text>
        <ButtonLive isLive={isLive} onClick={() => setIsLive(!isLive)} />
        {isLive ? (
          <>
            <BiddingInformationLiveOnly />
          </>
        ) : (
          <>
            <BiddingInformationHistorical status="Live" />
          </>
        )}
      </Stack>
    </>
  );
}
