import axios from "axios";

const api = axios.create({
    baseURL : import.meta.env.VITE_API_BASE_URL,
     withCredentials: true,
})

// http://localhost:3000

export default api;