import { getUsers } from "@/networks/auth";
import { useEffect, useRef, useState } from "react";
import useDebounce from "../useDebounce";

export default function useGetAccounts({
  keyword,
  show,
}: {
  keyword: string;
  show: string;
}) {
  const firstRun = useRef(true);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();

  const fetchUsers = (page: string, show: string) => {
    const token = localStorage.getItem("token") || "";
    setIsLoading(true);
    getUsers("true", token, page, show, keyword)
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
      fetchUsers("1", show);
      firstRun.current = false;
    }
  }, []);

  // DeBounce Function
  useDebounce(
    () => {
      fetchUsers("1", show);
    },
    [keyword],
    500
  );

  return {
    isLoading,
    data,
  };
}
