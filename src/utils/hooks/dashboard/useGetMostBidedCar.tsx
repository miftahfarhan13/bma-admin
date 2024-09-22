import { getMostBidedCar } from "@/networks/dashboard";
import { useEffect, useRef, useState } from "react";

export default function useGetMostBidedCar() {
  const firstRun = useRef(true);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();

  const fetchMostBidedCar = () => {
    const token = localStorage.getItem("token") || "";
    setIsLoading(true);
    getMostBidedCar(token)
      .then((response) => {
        setData(response?.data?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (firstRun.current) {
      fetchMostBidedCar();
      firstRun.current = false;
    }
  }, []);

  const refetch = () => {
    fetchMostBidedCar();
  };

  return {
    isLoading,
    data,
    refetch,
  };
}
