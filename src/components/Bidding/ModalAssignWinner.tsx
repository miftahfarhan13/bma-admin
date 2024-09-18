import { fetchDeleteUser } from "@/networks/auth";
import { fetchAssignWinner } from "@/networks/car";
import {
  Button,
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
import { useState } from "react";

export default function ModalAssignWinner({
  userId,
  carId,
  onSuccess,
}: {
  userId: number;
  carId: number;
  onSuccess: () => void;
}) {
  const toast = useToast();
  const [isLoading, setIsloading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onAssignWinner = async () => {
    setIsloading(true);
    const token = localStorage.getItem("token") || "";
    await fetchAssignWinner(token, carId, { user_id: userId })
      .then((response) => {
        setIsloading(false);
        toast({
          title: "Success",
          description: "Berhasil mengganti pemenang!",
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
          title: "Gagal mengganti pemenang",
          description: error?.response?.data?.message,
          status: "error",
          isClosable: true,
          position: "top",
        });
      });
  };

  return (
    <>
      <Button variant="outline" width="200px" onClick={onOpen}>
        Select Winner
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Assign Winner</ModalHeader>
          <ModalBody>
            <Text>Apakah anda yakin ingin mengganti pemenang?</Text>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant="green-solid-medium"
              isLoading={isLoading}
              onClick={onAssignWinner}
            >
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
