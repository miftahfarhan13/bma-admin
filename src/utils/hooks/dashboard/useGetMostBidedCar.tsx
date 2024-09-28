import { getMostBidedCar } from "@/networks/dashboard";
import { useEffect, useRef, useState } from "react";

export default function useGetMostBidedCar({ date }: { date: string }) {
  const firstRun = useRef(true);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();

  const fetchMostBidedCar = (date: string) => {
    const token = localStorage.getItem("token") || "";
    setIsLoading(true);
    getMostBidedCar(token, date)
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
      fetchMostBidedCar(date);
      firstRun.current = false;
    }
  }, []);

  const refetch = (date: string) => {
    fetchMostBidedCar(date);
  };

  return {
    isLoading,
    data,
    refetch,
  };
}
