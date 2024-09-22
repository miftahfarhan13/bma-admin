import { axiosClient } from "./apiClient";

export function exportBiddingInformation(token: string) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axiosClient.post(`/bids/export`, {}, config);
}
