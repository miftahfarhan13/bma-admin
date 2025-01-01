import { Image, Stack, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

export default function CarDamageImage({
  title,
  imageUrl,
}: {
  title: string;
  imageUrl: string;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Stack
        onClick={onOpen}
        cursor="pointer"
        direction="column"
        border="2px solid #f4f4f5"
        p="10px"
        borderRadius="10px"
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${imageUrl}`}
          alt="Damage Image"
          w="300px"
          h="200px"
          objectFit="contain"
        />
        <Text>{title}</Text>
      </Stack>

      <Modal isCentered size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody p="20px">
            <Stack direction="column">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${imageUrl}`}
                alt="Damage Image"
                objectFit="contain"
              />
              <Text>{title}</Text>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
