import { getCarsWithBids } from "@/networks/car";
import { useEffect, useRef, useState } from "react";

export default function useGetCarBids({ date, status }: { date: string, status?: string }) {
  const firstRun = useRef(true);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();

  const fetchGetCarBids = () => {
    const token = localStorage.getItem("token") || "";
    setIsLoading(true);
    getCarsWithBids({
      isPaginate: "false",
      token,
      page: "",
      show: "",
      search: "",
      date,
      status: status || ""
    })
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
      fetchGetCarBids();
      firstRun.current = false;
    }
  }, []);

  const refetch = () => {
    fetchGetCarBids();
  };

  return {
    isLoading,
    data,
    refetch,
  };
}
