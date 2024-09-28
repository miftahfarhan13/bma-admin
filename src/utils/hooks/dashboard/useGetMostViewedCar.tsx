import { getMostViewedCar } from "@/networks/dashboard";
import { useEffect, useRef, useState } from "react";

export default function useGetMostViewedCar({ date }: { date: string }) {
  const firstRun = useRef(true);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();

  const fetchMostViewedCar = (date: string) => {
    const token = localStorage.getItem("token") || "";
    setIsLoading(true);
    getMostViewedCar(token, date)
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
      fetchMostViewedCar(date);
      firstRun.current = false;
    }
  }, []);

  const refetch = (date: string) => {
    fetchMostViewedCar(date);
  };

  return {
    isLoading,
    data,
    refetch,
  };
}
