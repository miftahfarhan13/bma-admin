import { Button, Circle, keyframes, Stack, Text } from "@chakra-ui/react";
import React from "react";

export default function ButtonLive({
  isLive,
  onClick,
}: {
  isLive: boolean;
  onClick: () => void;
}) {
  const pulseAnimation = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.5); }
    100% { transform: scale(1); }
  `;

  return (
    <Button
      size="sm"
      variant={isLive ? "primary-solid-small" : "outline"}
      height="30px"
      width="70px"
      borderRadius="8px"
      onClick={onClick}
    >
      <Stack direction="row" alignItems="center">
        <Circle
          size="10px"
          bgColor="white"
          border={isLive ? "" : "1px solid black"}
          animation={`${isLive ? pulseAnimation : ""} 1.5s infinite`}
        />
        <Text>Live</Text>
      </Stack>
    </Button>
  );
}
