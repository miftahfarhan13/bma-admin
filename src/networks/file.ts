import { axiosClient } from "./apiClient";

export function fetchUploadFile(token: string, data: any) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };
  return axiosClient.post(`/upload`, data, config);
}

export function fetchDeleteFile(token: string, data: any) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosClient.post(`/delete-file`, data, config);
}
