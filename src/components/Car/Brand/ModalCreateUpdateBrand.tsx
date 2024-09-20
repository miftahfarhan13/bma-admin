import { createBrand, updateBrand } from "@/networks/brand";
import {
  Button,
  IconButton,
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

export default function ModalCreateUpdateBrand({
  id,
  brand,
  type,
  onSuccess,
}: {
  id?: number;
  brand?: string;
  type: string;
  onSuccess(): void;
}) {
  const toast = useToast();
  const [isLoading, setIsloading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onCreateBrand = async ({ name }: { name: string }) => {
    setIsloading(true);
    const token = localStorage.getItem("token") || "";
    await createBrand(token, { brand_name: name })
      .then((response) => {
        setIsloading(false);
        toast({
          title: "Success",
          description: "Berhasil menambah Merek!",
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
          description: "Gagal menambah Merek!",
          status: "error",
          isClosable: true,
          position: "top",
        });
      });
  };

  const onUpdateBrand = async ({ name }: { name: string }) => {
    setIsloading(true);
    const token = localStorage.getItem("token") || "";
    await updateBrand(token, id || 0, { brand_name: name })
      .then((response) => {
        setIsloading(false);
        toast({
          title: "Success",
          description: "Berhasil mengubah Merek!",
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
          description: "Gagal mengubah Merek!",
          status: "error",
          isClosable: true,
          position: "top",
        });
      });
  };

  const onSubmit = ({ name }: { name: string }) => {
    if (type === "create") {
      onCreateBrand({ name });
    } else {
      onUpdateBrand({ name });
    }
  };

  return (
    <>
      {type === "create" ? (
        <>
          <Button
            onClick={onOpen}
            leftIcon={<Icon icon="bxs:tag" />}
            variant="primary-solid-medium"
            w={["100%", "100%", "fit-content", "fit-content"]}
          >
            Add Merek
          </Button>
        </>
      ) : (
        <>
          <IconButton
            onClick={onOpen}
            _hover={{}}
            bgColor="#65DE78"
            color="white"
            icon={<Icon icon="bx:edit" />}
            aria-label=""
          />
        </>
      )}

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          as="form"
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());

            const name = formJson.name;

            onSubmit({ name });
          }}
        >
          <ModalCloseButton />
          <ModalHeader>
            {type === "create" ? "Tambah Data Merek" : "Update Data Merek"}{" "}
          </ModalHeader>
          <ModalBody>
            <Stack direction="column" spacing="5px">
              <Text fontSize="14px" color="grey">
                Nama
              </Text>
              <Input
                placeholder="Nama"
                name="name"
                defaultValue={brand}
                required
              />
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
