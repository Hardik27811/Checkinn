import axios from "axios";

const api = axios.create({
    baseURL :"https://checkinn-1-hu98.onrender.com",
     withCredentials: true,
})

// http://localhost:3000

export default api;