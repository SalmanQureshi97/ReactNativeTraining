import axios from "axios";
import promise from "promise";

// Add a request interceptor
var axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    //If the header does not contain the token and the url not public, redirect to login
    config.headers.authorization = "ARAY WAH REQUEST TOKEN";
    console.log("HANDLING REQUEST");
    return config;
  },
  function (error) {
    // Do something with request error
    return promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (config) {
    // Do something before request is sent
    //If the header does not contain the token and the url not public, redirect to login
    config.headers.authorization = "ARAY WAH RESPONSE TOKEN";
    console.log("HANDLING Response");
    return config;
  },
  function (error) {
    // Do something with request error
    return promise.reject(error);
  }
);

export default axiosInstance;
