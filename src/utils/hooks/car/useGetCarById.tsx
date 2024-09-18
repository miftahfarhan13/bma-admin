import { getCarById } from "@/networks/car";
import { useEffect, useRef, useState } from "react";

export default function useGetCarById({ id }: { id: string }) {
  const firstRun = useRef(true);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();

  const fetchUser = () => {
    const token = localStorage.getItem("token") || "";
    setIsLoading(true);
    getCarById(id, token)
      .then((response) => {
        setData(response?.data?.result);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (firstRun.current) {
      fetchUser();
      firstRun.current = false;
    }
  }, []);

  const refetch = () => {
    fetchUser();
  };

  return {
    isLoading,
    data,
    refetch,
  };
}
