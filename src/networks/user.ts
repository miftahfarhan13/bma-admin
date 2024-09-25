import { axiosClient } from "./apiClient";

export function getBdPerformances(
  isPaginate: string,
  token: string,
  page?: string,
  show?: string,
  date?: string
) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosClient.get(
    `/bd-performances?is_paginate=${isPaginate}&page=${page}&per_page=${show}&date=${date}`,
    config
  );
}

export function getBdDealerParticipation(
  id: string,
  isPaginate: string,
  token: string,
  page: string,
  show: string,
  date: string
) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosClient.get(
    `/bd-performances/dealer-bid-participation/${id}?is_paginate=${isPaginate}&page=${page}&per_page=${show}&date=${date}`,
    config
  );
}

export function getBdDealerWin(
  id: string,
  isPaginate: string,
  token: string,
  page: string,
  show: string,
  date: string
) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosClient.get(
    `/bd-performances/dealer-bid-win/${id}?is_paginate=${isPaginate}&page=${page}&per_page=${show}&date=${date}`,
    config
  );
}
