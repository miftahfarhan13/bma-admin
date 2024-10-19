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

export function getChartDealerPerformance(token: string) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosClient.get(`/bd-performances/chart/dealer`, config);
}

export function getChartCarPerformance(token: string) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosClient.get(`/bd-performances/chart/car`, config);
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
  return axiosClient.get(`/bd-performances/table?search=${search}&start_date=${startDate}&end_date=${endDate}`, config);
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
