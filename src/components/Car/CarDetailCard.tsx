import { BASE_IMAGE_URL } from "@/utils/constant/image";
import { Box, Image, Stack, Text } from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

export default function CarDetailCard({ car }: { car: any }) {
  return (
    <>
      <Box
        boxShadow="md"
        borderRadius="8px"
        p={["10px", "10px", "20px", "20px"]}
        background={[
          "linear-gradient(180deg, rgba(237,28,41,1) 0%, rgba(255,255,255,1) 30%, rgba(255,255,255,1) 100%)",
          "linear-gradient(180deg, rgba(237,28,41,1) 0%, rgba(255,255,255,1) 30%, rgba(255,255,255,1) 100%)",
          "linear-gradient(90deg, rgba(237,28,41,1) 0%, rgba(255,255,255,1) 20%, rgba(255,255,255,1) 100%)",
          "linear-gradient(90deg, rgba(237,28,41,1) 0%, rgba(255,255,255,1) 20%, rgba(255,255,255,1) 100%)",
        ]}
      >
        <Stack direction={["column", "column", "row", "row"]} spacing="10px">
          <Image
            alignSelf="center"
            borderRadius="10px"
            height={["100px", "100px", "auto", "auto"]}
            width={["fit-content", "fit-content", "300px", "300px"]}
            src={
              car?.car_images
                ? `${BASE_IMAGE_URL}/${car?.car_images[0]?.img_path}`
                : ""
            }
          />

          <Stack direction="column" spacing="10px">
            <Text fontSize={["18px", "18px", "24px", "24px"]} fontWeight="700">
              {car?.brand?.brand_name} {car?.car_name}
            </Text>
            <Stack direction="column" spacing="5px">
              <Stack direction="row" spacing="10px" alignItems="center">
                <Icon icon="fa6-solid:car-side" />
                <Text>{car?.license_plate}</Text>
              </Stack>
              <Stack direction="row" spacing="10px" alignItems="center">
                <Icon icon="fa6-solid:gas-pump" />
                <Text>{car?.fuel_type}</Text>
              </Stack>
              <Stack direction="row" spacing="10px" alignItems="center">
                <Icon icon="solar:transmission-square-bold" />
                <Text>{car?.transmission_type}</Text>
              </Stack>
              <Stack direction="row" spacing="10px" alignItems="center">
                <Icon icon="bxs:book" />
                <Text>{car?.car_availability}</Text>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}
