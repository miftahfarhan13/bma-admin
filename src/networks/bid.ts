import { axiosClient } from "./apiClient";

export const bids = async (
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

  let url = `/bids?is_paginate=${isPaginate}`;

  if (page) url += `&page=${page}`;
  if (search) url += `&search=${search}`;
  if (show) url += `&per_page=${show}`;
  if (startDate) url += `&start_date=${startDate}`;
  if (endDate) url += `&end_date=${endDate}`;

  return axiosClient.get(url, config);
};

export function exportBiddingInformation(token: string) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axiosClient.post(`/bids/export`, {}, config);
}
