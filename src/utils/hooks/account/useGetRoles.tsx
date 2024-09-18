import { getRoles } from "@/networks/auth";
import { useEffect, useRef, useState } from "react";

export default function useGetRoles() {
  const firstRun = useRef(true);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();

  const fetchRoles = () => {
    const token = localStorage.getItem("token") || "";
    setIsLoading(true);
    getRoles(token)
      .then((response) => {
        setData(response?.data?.result);
        setIsLoading(false);
      })
      .catch((error) => {
        setData([]);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (firstRun.current) {
      fetchRoles();
      firstRun.current = false;
    }
  }, []);

  return {
    isLoading,
    data,
  };
}
