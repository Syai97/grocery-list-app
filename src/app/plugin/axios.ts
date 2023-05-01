import Axios, { AxiosRequestConfig } from "axios";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

const appConnector = Axios.create({
  baseURL: API_ENDPOINT,
});

export default appConnector;
