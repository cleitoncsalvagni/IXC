import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8889/v1",
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
