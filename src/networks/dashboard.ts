import { axiosClient } from "./apiClient";

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
