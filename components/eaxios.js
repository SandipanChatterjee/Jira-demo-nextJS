import axios from "axios";
const baseURL = process.env.REACT_APP_API_URL;
const instance = axios.create({
  baseURL: baseURL,
});

instance.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log("error####", error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (config) => {
    console.log("responseConfig#", config);
    return config.data;
  },
  (error) => {
    let errorMessage;
    if (error.message === "Network Error") {
      errorMessage = "Please check your internet connection";
    } else if (error.response.status >= 400 && error.response.status <= 499) {
      errorMessage = "Data Not Found";
    } else if (error.response.status >= 500) {
      errorMessage = "Internal Server Error";
    }
    return Promise.reject(errorMessage);
  }
);

export default instance;
