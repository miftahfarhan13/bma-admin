import { axiosClient } from "@/networks/apiClient";

export const loginHistories = async (
  isPaginate: string,
  token: string,
  page: string,
  show: string,
  search: string,
  startDate?: string,
  endDate?: string
) => {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let url = `/login-history?is_paginate=${isPaginate}`;

  if (page) url += `&page=${page}`;
  if (search) url += `&search=${search}`;
  if (show) url += `&per_page=${show}`;
  if (startDate) url += `&start_date=${startDate}`;
  if (endDate) url += `&end_date=${endDate}`;

  return axiosClient.get(url, config);
};
