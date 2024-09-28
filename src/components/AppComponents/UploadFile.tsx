import React, { useEffect, useRef, useState } from "react";
import * as imageConversion from "image-conversion";
import { fetchUploadFile } from "@/networks/file";
import {
  Box,
  Button,
  IconButton,
  Image,
  Input,
  Skeleton,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";

function UploadFile({
  url,
  onChangeValue,
  filePath,
}: {
  url: string;
  onChangeValue: (value: string) => void;
  filePath: string;
}) {
  const toast = useToast();
  const fileUpload = useRef<HTMLInputElement>(null);
  const [fileToUpload, setFileToUpload] = useState(url);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (url) {
      setFileToUpload(url);
    }
  }, [url]);

  const uploadProfilePic = async () => {
    setIsLoading(true);
    // @ts-ignore
    const file = fileUpload.current.files[0];
    const convert = await imageConversion.compressAccurately(file, 500);
    const new_file = new File([convert], file.name, { type: convert.type });
    if (
      new_file["type"] === "image/jpeg" ||
      new_file["type"] === "image/png" ||
      new_file["type"] === "image/jpg"
    ) {
      onUploadFile(new_file);
    } else {
      toast({
        title: "Failed",
        description:
          "Gagal mengupload foto. Format foto harus berupa jpeg, png, jpg.",
        status: "error",
        isClosable: true,
        position: "top",
      });

      setIsLoading(false);
    }
  };

  const onUploadFile = async (file: any) => {
    const form = new FormData();
    form.append("file", file);
    form.append("filePath", filePath);

    await fetchUploadFile(localStorage.getItem("token") || "", form)
      .then((response) => {
        setIsLoading(false);
        toast({
          title: "Success",
          description: "Berhasil mengupload File!",
          status: "success",
          isClosable: true,
          position: "top",
        });

        setFileToUpload(response.data?.data);
        onChangeValue(response.data?.data);
      })
      .catch((error) => {
        setIsLoading(false);
        const message = error?.response?.data?.message
          ? error?.response?.data?.message
          : error?.message;
        toast({
          title: "Failed",
          description: message,
          status: "error",
          isClosable: true,
          position: "top",
        });
      });
  };

  const onSelectFile = () => {
    if (fileUpload.current) {
      fileUpload.current.click();
    }
  };

  return (
    <Box width="100%">
      <Box
        border="1px solid rgba(140, 140, 140, 0.2)"
        borderRadius="8px"
        padding="16px"
      >
        <Stack direction="column" alignItems="center" spacing="10px">
          {isLoading ? (
            <Skeleton variant="rounded" width="100%" height="100px" />
          ) : (
            <Image
              width="100%"
              height="150px"
              src={
                fileToUpload
                  ? `${process.env.NEXT_PUBLIC_API_URL}/storage/${fileToUpload}`
                  : "/images/default-image.jpeg"
              }
              alt="Foto"
              style={{ objectFit: "contain" }}
            ></Image>
          )}

          {!fileToUpload ? (
            <Button
              role={undefined}
              variant="contained"
              tabIndex={-1}
              leftIcon={<Icon icon="bx:upload" />}
              onClick={onSelectFile}
            >
              Upload file
              <Input
                onChange={() => uploadProfilePic()}
                ref={fileUpload}
                type="file"
                hidden
              />
            </Button>
          ) : (
            <Button
              variant="contained"
              tabIndex={-1}
              leftIcon={<Icon icon="bx:trash" />}
              onClick={() => setFileToUpload("")}
              color="bma.primary"
            >
              Ganti File
            </Button>
          )}
        </Stack>
      </Box>
    </Box>
  );
}

export default UploadFile;
