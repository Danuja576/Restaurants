import axios from "axios";

// remove mode in .env when deployment
const BASE_URL = import.meta.env.MODE === "development" ? import.meta.env.VITE_API_BASE_URL :"/api"
const api = axios.create({
    baseURL : BASE_URL,
});
export default api;