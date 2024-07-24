import axios from "axios";

const hostDomain = `http://localhost:8080/`;

const instance = axios.create({
  baseURL: hostDomain,
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

// instance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       window.location.href = "/";
//     } else {
//       return Promise.reject(error);
//     }
//   }
// );

export default instance;
