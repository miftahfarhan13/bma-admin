import { roleState } from "@/atom/role";
import { fetchLoggedUser } from "@/networks/auth";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";

export default function useGetMe() {
  const setRole = useSetRecoilState(roleState);
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
        const roles =
          response?.data?.data?.roles?.length > 0
            ? response?.data?.data?.roles[0]?.name
            : "";
        const localRole = localStorage.getItem("role");
        if (!localRole) localStorage.setItem("role", roles);
        setRole(roles);
      })
      .catch((error) => {
        setIsLoading(false);
        localStorage.removeItem("role");
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
