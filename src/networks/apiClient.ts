import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const setBearerToken = (token: string) => {
  axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export { axiosClient, setBearerToken };
