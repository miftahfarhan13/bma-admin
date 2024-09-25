import { axiosClient } from "@/networks/apiClient";

export function getCars(
  isPaginate: string,
  token: string,
  page: string,
  show: string,
  search: string,
  date?: string
) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosClient.get(
    `/cars?is_paginate=${isPaginate}&page=${page}&per_page=${show}&search=${search}&date=${date}`,
    config
  );
}

export function getCarsWithBids(
  isPaginate: string,
  token: string,
  page?: string,
  show?: string,
  search?: string,
  date?: string
) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosClient.get(
    `/bids/bids-information?is_paginate=${isPaginate}&page=${page}&per_page=${show}&search=${search}&date=${date}`,
    config
  );
}

export function getBidsByCarId(
  carId: string,
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
    `/cars/bids/${carId}?is_paginate=${isPaginate}&page=${page}&per_page=${show}&search=${search}`,
    config
  );
}

export function getLastSeenByCarId(
  carId: string,
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
    `/cars/last-seen/${carId}?is_paginate=${isPaginate}&page=${page}&per_page=${show}&search=${search}`,
    config
  );
}

export function getBidsForWinnerByCarId(
  carId: string,
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
    `/cars/bids-for-winner/${carId}?is_paginate=${isPaginate}&page=${page}&per_page=${show}&search=${search}`,
    config
  );
}

export function getCarById(id: string, token: string) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosClient.get(`/cars/${id}`, config);
}

export function fetchAssignWinner(token: string, id: number, data: any) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axiosClient.post(`/cars/assign-winner/${id}`, data, config);
}

export function fetchCreateCar(data: any, token: string) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axiosClient.post(`/cars`, data, config);
}

export function fetchUpdateCar(
  id: string | undefined,
  data: any,
  token: string
) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axiosClient.put(`/cars/${id}`, data, config);
}


export function deleteCar(token: string, id: number) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axiosClient.delete(`/cars/${id}`, config);
}
