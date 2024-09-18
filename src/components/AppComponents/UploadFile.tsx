import React, { useEffect, useRef, useState } from "react";
import * as imageConversion from "image-conversion";
import { fetchUploadFile } from "@/networks/file";
import {
  Box,
  Button,
  IconButton,
  Input,
  Skeleton,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Icon } from "@iconify/react/dist/iconify.js";

function UploadFile({
  url,
  onChangeValue,
}: {
  url: string;
  onChangeValue: (value: string) => void;
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
    form.append("filePath", "deposit");

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
      <Stack direction="column" alignItems="center" spacing={1}>
        <Box position="relative">
          <Box
            border="1px solid rgba(140, 140, 140, 0.2)"
            borderRadius="8px"
            padding="16px"
          >
            {isLoading ? (
              <Skeleton variant="rounded" width={300} height={200} />
            ) : (
              <img
                height={200}
                width={300}
                src={
                  fileToUpload
                    ? `http://127.0.0.1:8000/storage/${fileToUpload}`
                    : "/images/default-image.jpeg"
                }
                alt="Foto"
                style={{ objectFit: "contain" }}
              ></img>
            )}
          </Box>

          {fileToUpload && (
            <IconButton
              aria-label="Icon Delete File"
              position="absolute"
              top={-3}
              right={-2}
              onClick={() => setFileToUpload("")}
              icon={<Icon icon="bx:x" />}
              size="sm"
              bgColor="bma.primary"
              color="white"
              _hover={{}}
            ></IconButton>
          )}
        </Box>

        {!fileToUpload && (
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
        )}
      </Stack>
    </Box>
  );
}

export default UploadFile;
