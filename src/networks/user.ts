import { axiosClient } from "./apiClient";

export function getBdPerformances({
  isPaginate,
  token,
  page,
  show,
  search,
  date,
  startDate,
  endDate,
  isRange,
}: {
  isPaginate: string;
  token: string;
  page?: string;
  show?: string;
  search?: string;
  date?: string;
  startDate?: string;
  endDate?: string;
  isRange?: boolean;
}) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  if (isRange) {
    return axiosClient.get(
      `/bd-performances?is_paginate=${isPaginate}&page=${page}&per_page=${show}&start_date=${startDate}&end_date=${endDate}`,
      config
    );
  } else {
    return axiosClient.get(
      `/bd-performances?is_paginate=${isPaginate}&page=${page}&per_page=${show}&date=${date}`,
      config
    );
  }
}

export function getBdDealerParticipation({
  id,
  isPaginate,
  token,
  page,
  show,
  date,
  startDate,
  endDate,
  isRange,
}: {
  id: string;
  isPaginate: string;
  token: string;
  page: string;
  show: string;
  date: string;
  startDate: string;
  endDate: string;
  isRange: boolean;
}) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  if (isRange) {
    return axiosClient.get(
      `/bd-performances/dealer-bid-participation/${id}?is_paginate=${isPaginate}&page=${page}&per_page=${show}&start_date=${startDate}&end_date=${endDate}`,
      config
    );
  } else {
    return axiosClient.get(
      `/bd-performances/dealer-bid-participation/${id}?is_paginate=${isPaginate}&page=${page}&per_page=${show}&date=${date}`,
      config
    );
  }
}

export function getBdDealerWin({
  id,
  isPaginate,
  token,
  page,
  show,
  date,
  startDate,
  endDate,
  isRange,
}: {
  id: string;
  isPaginate: string;
  token: string;
  page: string;
  show: string;
  date: string;
  startDate: string;
  endDate: string;
  isRange: boolean;
}) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  if (isRange) {
    return axiosClient.get(
      `/bd-performances/dealer-bid-win/${id}?is_paginate=${isPaginate}&page=${page}&per_page=${show}&start_date=${startDate}&end_date=${endDate}`,
      config
    );
  } else {
    return axiosClient.get(
      `/bd-performances/dealer-bid-win/${id}?is_paginate=${isPaginate}&page=${page}&per_page=${show}&date=${date}`,
      config
    );
  }
}

export function getBdDealerCreated({
  id,
  isPaginate,
  token,
  page,
  show,
  date,
  startDate,
  endDate,
  isRange,
}: {
  id: string;
  isPaginate: string;
  token: string;
  page: string;
  show: string;
  date: string;
  startDate: string;
  endDate: string;
  isRange: boolean;
}) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  if (isRange) {
    return axiosClient.get(
      `/bd-performances/dealer-bid-created/${id}?is_paginate=${isPaginate}&page=${page}&per_page=${show}&start_date=${startDate}&end_date=${endDate}`,
      config
    );
  } else {
    return axiosClient.get(
      `/bd-performances/dealer-bid-created/${id}?is_paginate=${isPaginate}&page=${page}&per_page=${show}&date=${date}`,
      config
    );
  }
}

export function getBdDealerView({
  id,
  isPaginate,
  token,
  page,
  show,
  date,
  startDate,
  endDate,
  isRange,
}: {
  id: string;
  isPaginate: string;
  token: string;
  page: string;
  show: string;
  date: string;
  startDate: string;
  endDate: string;
  isRange: boolean;
}) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  if (isRange) {
    return axiosClient.get(
      `/bd-performances/dealer-bid-view/${id}?is_paginate=${isPaginate}&page=${page}&per_page=${show}&start_date=${startDate}&end_date=${endDate}`,
      config
    );
  } else {
    return axiosClient.get(
      `/bd-performances/dealer-bid-view/${id}?is_paginate=${isPaginate}&page=${page}&per_page=${show}&date=${date}`,
      config
    );
  }
}

export const getBdDealerLogin = async ({
  id,
  isPaginate,
  token,
  page,
  show,
  search,
  startDate,
  endDate,
}: {
  id: string;
  isPaginate: string;
  token: string;
  page: string;
  show: string;
  search?: string;
  startDate?: string;
  endDate?: string;
}) => {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let url = `/login-history/summary?is_paginate=${isPaginate}&bd_id=${id}`;

  if (page) url += `&page=${page}`;
  if (search) url += `&search=${search}`;
  if (show) url += `&per_page=${show}`;
  if (startDate) url += `&start_date=${startDate}`;
  if (endDate) url += `&end_date=${endDate}`;

  return axiosClient.get(url, config);
};
