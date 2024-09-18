import { fetchDeleteUser } from "@/networks/auth";
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

export default function ModalDeleteAccount({
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
    await fetchDeleteUser(token, id)
      .then((response) => {
        setIsloading(false);
        toast({
          title: "Success",
          description: "Berhasil menghapus user!",
          status: "success",
          isClosable: true,
          position: "top",
        });

        onSuccess();
      })
      .catch((error) => {
        console.log(error);
        setIsloading(false);

        toast({
          title: "Failed",
          description: "Gagal menghapus user!",
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Hapus Data Akun</ModalHeader>
          <ModalBody>
            <Text>Apakah anda yakin ingin menghapus data kategori?</Text>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="primary-solid-medium" isLoading={isLoading} onClick={onDelete}>
              Hapus
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
