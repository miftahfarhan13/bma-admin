import { updateCustomer } from "@/networks/car";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";

export default function ModalCreateUpdateCustomer({
  id,
  name,
  email,
  type,
  onSuccess,
}: {
  id?: number;
  name?: string;
  email?: string;
  type: string;
  onSuccess(): void;
}) {
  const toast = useToast();
  const [isLoading, setIsloading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onUpdateCustomer = async ({
    name,
    email,
  }: {
    name: string;
    email: string;
  }) => {
    setIsloading(true);
    const token = localStorage.getItem("token") || "";
    await updateCustomer(token, id || 0, {
      is_jmm_car: true,
      customer_name: name,
      customer_email: email,
    })
      .then((response) => {
        setIsloading(false);
        toast({
          title: "Success",
          description: "Berhasil mengubah data Customer!",
          status: "success",
          isClosable: true,
          position: "top",
        });
        onClose();
        onSuccess();
      })
      .catch((error) => {
        setIsloading(false);

        toast({
          title: "Failed",
          description: "Gagal mengubah data Customer!",
          status: "error",
          isClosable: true,
          position: "top",
        });
      });
  };

  return (
    <>
      <Button
        onClick={onOpen}
        leftIcon={<Icon icon="bxs:edit" />}
        variant="primary-solid-medium"
        w={["100%", "100%", "fit-content", "fit-content"]}
      >
        Ubah Data Customer
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          as="form"
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());

            const name = formJson.name;
            const email = formJson.email;

            onUpdateCustomer({ name, email });
          }}
        >
          <ModalCloseButton />
          <ModalHeader>
            {type === "create"
              ? "Tambah Data Customer"
              : "Update Data Customer"}{" "}
          </ModalHeader>
          <ModalBody>
            <Stack direction="column" spacing="10px">
              <Stack direction="column" spacing="5px">
                <Text fontSize="14px" color="grey">
                  Nama Customer
                </Text>
                <Input
                  placeholder="Nama Customer"
                  name="name"
                  defaultValue={name}
                  required
                />
              </Stack>
              <Stack direction="column" spacing="5px">
                <Text fontSize="14px" color="grey">
                  Email Customer
                </Text>
                <Input
                  placeholder="Email Customer"
                  name="email"
                  defaultValue={email}
                  type="email"
                  required
                />
              </Stack>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant="green-solid-medium"
              isLoading={isLoading}
              type="submit"
            >
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
