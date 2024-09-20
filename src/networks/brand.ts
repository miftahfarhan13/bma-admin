import { axiosClient } from "./apiClient";

export function getBrands(
  isPaginate: string,
  token: string,
  page?: string,
  show?: string,
  search?: string
) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosClient.get(
    `/brands?is_paginate=${isPaginate}&page=${page}&per_page=${show}${
      search ? `&search=${search}` : ""
    }`,
    config
  );
}

export function createBrand(token: string, data: any) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axiosClient.post(`/brands`, data, config);
}

export function updateBrand(token: string, id: number, data: any) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axiosClient.put(`/brands/${id}`, data, config);
}

export function deleteBrand(token: string, id: number) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axiosClient.delete(`/brands/${id}`, config);
}
