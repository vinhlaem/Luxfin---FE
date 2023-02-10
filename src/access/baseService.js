import axios from "axios";

const client = axios.create({
  baseURL: process.env.PUBLIC_URL_API,
  headers: {
    "Content-Type": "application/json",
  },
});
client.interceptors.request.use(
  async (config) => {
    const token = await localStorage.getItem("secure_token");
    config.headers.authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.log(error.response);
    if (!error.response) {
      throw new Error("connectionError");
    }
    return Promise.reject(error);
  }
);

client.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// client.interceptors.response.use(
//   async (res) => {
//     const refreshedToken = res.headers["x-refreshed-id-token"];
//     return res;
//   },
//   (error) => Promise.reject(error)
// );

export default client;
