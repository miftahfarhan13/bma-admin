import { fetchDeleteUser } from "@/networks/auth";
import { deleteBrand } from "@/networks/brand";
import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

export default function ModalDeleteCar({
  id,
  onSuccess,
}: {
  id: number;
  onSuccess: () => void;
}) {
  const toast = useToast();
  const [isLoading, setIsloading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onDelete = async () => {
    setIsloading(true);
    const token = localStorage.getItem("token") || "";
    await deleteBrand(token, id)
      .then((response) => {
        setIsloading(false);
        toast({
          title: "Success",
          description: "Berhasil menghapus Mobil!",
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
          description: "Gagal menghapus Mobil!",
          status: "error",
          isClosable: true,
          position: "top",
        });
      });
  };

  return (
    <>
      <IconButton
        _hover={{}}
        bgColor="#ED1C29"
        color="white"
        icon={<Icon icon="bx:trash" />}
        aria-label=""
        onClick={onOpen}
      />

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Hapus Data Mobil</ModalHeader>
          <ModalBody>
            <Text>Apakah anda yakin ingin menghapus data Mobil?</Text>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant="primary-solid-medium"
              isLoading={isLoading}
              onClick={onDelete}
            >
              Hapus
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
