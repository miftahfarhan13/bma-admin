import { useToast } from "@chakra-ui/react";
import React, { useState } from "react";

export default function useDownloadFile() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const downloadFile = async ({
    url,
    fileName,
    fileType,
  }: {
    url: string;
    fileName: string;
    fileType?: "csv" | "excel" | string;
  }) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token") || "";
      const contentType =
        fileType === "excel"
          ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          : "text/csv";
      const fileExtension = fileType === "excel" ? "xlsx" : "csv";

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        method: "POST",
        headers: {
          "Content-Type": contentType,
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setIsLoading(false);
        toast({
          title: "Failed",
          description: "Failed to export data!",
          status: "error",
          isClosable: true,
          position: "top",
        });
        return;
      }

      const blob = await response.blob();
      const fileUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = fileUrl;
      a.download = `${fileName}.${fileExtension}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Failed",
        description: "Failed to export data!",
        status: "error",
        isClosable: true,
        position: "top",
      });
      console.error("Error downloading the file", error);
    }
  };

  return { isLoading, downloadFile };
}
