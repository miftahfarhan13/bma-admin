import { Center, Circle, keyframes, Stack, Text } from "@chakra-ui/react";
import React from "react";

export default function ChipBidStatus({ status }: { status: string }) {
  const pulseAnimation = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.5); }
    100% { transform: scale(1); }
  `;

  const style: any = {
    Live: {
      bgColor: "bma.primary",
      color: "white",
      fontWeight: "700",
    },
    Menang: {
      bgColor: "bma.green",
      color: "black",
      fontWeight: "700",
      border: "1px solid black",
    },
    Idle: {
      bgColor: "white",
      border: "1px solid black",
      fontWeight: "700",
    },
  };
  return (
    <Center p="5px" borderRadius="99px" {...style[status]}>
      <Stack direction="row" spacing="10px" alignItems="center">
        {status === "Live" && (
          <Circle
            size="10px"
            bgColor="white"
            animation={`${pulseAnimation} 1.5s infinite`}
          />
        )}
        <Text>{status}</Text>
      </Stack>
    </Center>
  );
}
