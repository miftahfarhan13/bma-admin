import { axiosClient } from "./apiClient";

export function getDashboard(token: string, date?: string) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosClient.get(`/dashboard?date=${date}`, config);
}

export function getMostViewedCar(token: string) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosClient.get(`/most-view-car`, config);
}

export function getMostBidedCar(token: string) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosClient.get(`/most-bided-car`, config);
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

export function getTableDealerPerformance(token: string, search: string) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosClient.get(`/bd-performances/table?search=${search}`, config);
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
