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

export default function CarDocumentImage({
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
        cursor="pointer"
        direction="column"
        border="2px solid #f4f4f5"
        p="10px"
        borderRadius="10px"
        alignItems="start"
        onClick={onOpen}
      >
        <Text fontWeight="600">{title}</Text>
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${imageUrl}`}
          alt="Document Image"
          w="300px"
          h="200px"
          objectFit="contain"
        />
      </Stack>

      <Modal isCentered size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody p="20px">
            <Stack direction="column">
              <Text fontWeight="600">{title}</Text>
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${imageUrl}`}
                alt="Document Image"
                objectFit="contain"
              />
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
