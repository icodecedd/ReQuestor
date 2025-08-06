import axios from "axios";

const api = axios.create({
  baseURL: "/api", // matches the backend route
  withCredentials: true, // required for cookie-based sessions
});

export default api;
