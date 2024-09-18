import { fetchLogout } from "@/networks/auth";
import { Button, MenuItem } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function ButtonLogout() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleLogout = async () => {
    setIsLoading(true);
    await fetchLogout(localStorage.getItem("token") || "")
      .then((response) => {
        localStorage.clear();
        router.replace("/login");
        setIsLoading(false);
      })
      .catch((error) => {
        localStorage.clear();
        router.replace("/login");
        setIsLoading(false);
      });
  };
  return <MenuItem onClick={handleLogout}>Logout</MenuItem>;
}
