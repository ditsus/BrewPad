import axios from "axios";

// production may not be localhost, so baseURL has to be dynamic
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

const api = axios.create({
    baseURL : BASE_URL,
});

export default api;