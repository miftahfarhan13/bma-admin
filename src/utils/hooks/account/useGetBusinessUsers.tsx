import { getBusinessUsers, getRoles } from "@/networks/auth";
import { useEffect, useRef, useState } from "react";

export default function useGetBusinessUsers() {
  const firstRun = useRef(true);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();

  const fetchUsers = () => {
    const token = localStorage.getItem("token") || "";
    setIsLoading(true);
    getBusinessUsers(token)
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
      fetchUsers();
      firstRun.current = false;
    }
  }, []);

  return {
    isLoading,
    data,
  };
}
