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

// export function getCarsWithBids({
//   isPaginate,
//   token,
//   page,
//   show,
//   search,
//   date,
//   startDate,
//   endDate,
//   isRange,
//   status,
// }: {
//   isPaginate: string;
//   token: string;
//   page?: string;
//   show?: string;
//   search?: string;
//   date?: string;
//   startDate?: string;
//   endDate?: string;
//   isRange?: boolean;
//   status?: boolean;
// }) {
//   let config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   if (isRange) {
//     return axiosClient.get(
//       `/bids/bids-information?is_paginate=${isPaginate}&page=${page}&per_page=${show}&search=${search}&start_date=${startDate}&end_date=${endDate}`,
//       config
//     );
//   } else {
//     return axiosClient.get(
//       `/bids/bids-information?is_paginate=${isPaginate}&page=${page}&per_page=${show}&search=${search}&date=${date}`,
//       config
//     );
//   }
// }

export const getCarsWithBids = async ({
  isPaginate,
  token,
  page,
  show,
  search,
  date,
  startDate,
  endDate,
  status,
}: {
  isPaginate: string;
  token: string;
  page?: string;
  show?: string;
  search?: string;
  date?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
}) => {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let url = `/bids/bids-information?is_paginate=${isPaginate}`;

  if (page) url += `&page=${page}`;
  if (search) url += `&search=${search}`;
  if (show) url += `&per_page=${show}`;
  if (startDate) url += `&start_date=${startDate}`;
  if (endDate) url += `&end_date=${endDate}`;
  if (date) url += `&date=${date}`;
  if (status) url += `&bidding_status=${status}`;

  return axiosClient.get(url, config);
};

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

export function getBidsSummaryByCarId(carId: string, token: string) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosClient.get(`/cars/bids/${carId}/summary`, config);
}

export function getLastSeenSummaryByCarId(carId: string, token: string) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axiosClient.get(`/cars/last-seen/${carId}/summary`, config);
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

export function updateCustomer(token: string, id: number, data: any) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axiosClient.put(`/cars/${id}/jmm-leads`, data, config);
}
