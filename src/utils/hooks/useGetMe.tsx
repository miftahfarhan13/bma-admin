import { fetchLoggedUser } from "@/networks/auth";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export default function useGetMe() {
  const router = useRouter();
  const firstRun = useRef(true);

  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>();

  const getLoggedUser = async (token: string) => {
    setIsLoading(true);
    await fetchLoggedUser(token)
      .then((response) => {
        setIsLoading(false);
        setUser(response?.data?.data);
      })
      .catch((error) => {
        setIsLoading(false);
        router.push("/login");
        // console.log(error.response.data.message);
      });
  };

  useEffect(() => {
    if (typeof window !== "undefined" && firstRun.current) {
      const token = localStorage.getItem("token");
      getLoggedUser(token || "");
      firstRun.current = false;
    }
  }, []);

  return {
    isLoading,
    user,
  };
}
