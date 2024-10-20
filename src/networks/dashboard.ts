import { axiosClient } from "./apiClient";

export function getDashboard(token: string, date?: string) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosClient.get(`/dashboard?date=${date}`, config);
}

export function getMostViewedCar(token: string, date: string) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosClient.get(`/most-view-car?date=${date}`, config);
}

export function getMostBidedCar(token: string, date: string) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosClient.get(`/most-bided-car?date=${date}`, config);
}

export async function getChartDealerPerformance({
  token,
  startDate,
  endDate,
}: {
  token: string;
  startDate?: string;
  endDate?: string;
}) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let url = `/bd-performances/chart/dealer`;

  if (startDate) url += `?start_date=${startDate}`;
  if (endDate) url += `&end_date=${endDate}`;

  return await axiosClient.get(url, config);
}

export async function getChartCarPerformance({
  token,
  startDate,
  endDate,
}: {
  token: string;
  startDate?: string;
  endDate?: string;
}) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let url = `/bd-performances/chart/car`;

  if (startDate) url += `?start_date=${startDate}`;
  if (endDate) url += `&end_date=${endDate}`;

  return await axiosClient.get(url, config);
}

export function getTableDealerPerformance(
  token: string,
  search: string,
  startDate: string,
  endDate: string
) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosClient.get(
    `/bd-performances/table?search=${search}&start_date=${startDate}&end_date=${endDate}`,
    config
  );
}

export function getDealerPerformanceDetail(
  token: string,
  id: string,
  date: string
) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosClient.get(`/bd-performances/${id}?date=${date}`, config);
}
