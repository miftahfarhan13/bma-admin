import { axiosClient } from "./apiClient";

export function fetchLogin(data: any) {
  return axiosClient.post("/login", data);
}

export function fetchLogout(token: string) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosClient.post("/logout", {}, config);
}

export function fetchLoggedUser(token: string) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosClient.get("/me", config);
}

export function getUsers(
  isPaginate: string,
  token: string,
  page: string,
  show: string,
  search: string
) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosClient.get(
    `/users?is_paginate=${isPaginate}&page=${page}&per_page=${show}&search=${search}`,
    config
  );
}

export function getUserById(id: string, token: string) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosClient.get(`/user/${id}`, config);
}

export function getRoles(token: string) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosClient.get(`/roles`, config);
}

export function getBusinessUsers(token: string) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosClient.get(`/business-users`, config);
}

export function fetchRegister(data: any, token: string) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axiosClient.post("/register", data, config);
}

export function fetchUpdateUser(
  id: string | undefined,
  data: any,
  token: string
) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axiosClient.post(`/update-user/${id}`, data, config);
}

export function fetchDeleteUser(token: string, id: number) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axiosClient.delete(`/delete-user/${id}`, config);
}
