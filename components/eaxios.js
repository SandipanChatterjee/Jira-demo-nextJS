import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_REACT_APP_API_URL;
const instance = axios.create({
  baseURL: baseURL,
});

instance.interceptors.request.use(
  (config) => {
    let token = process.env.NEXT_PUBLIC_REACT_APP_API_TOKEN;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (config) => {
    return config.data;
  },
  (error) => {
    let errorMessage;
    if (error.message === "Network Error") {
      errorMessage = "Please check your internet connection";
    } else if (
      error?.response?.status >= 400 &&
      error?.response?.status <= 499
    ) {
      errorMessage = "Data Not Found";
    } else if (error?.response?.status >= 500) {
      errorMessage = "Internal Server Error";
    }
    return new Error(errorMessage);
  }
);

export default instance;
