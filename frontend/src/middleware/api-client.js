import axios from "axios";
import { BASE_URL } from "constants/urlConstants";

const api = axios.create({
  baseURL: BASE_URL, // our API base URL
  // headers: {
  //   "Content-Type": "multipart/form-data",
  //   "Access-Control-Allow-Origin": "*",
  // },
});

// Request interceptor for adding the bearer token
api.interceptors.request.use(
  (config) => {
    let pathName = window.location.pathname;
    var role = pathName.substring(1, pathName.indexOf("/", 1));
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      `${role}Token`
    )}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Export the api instance
export default api;
