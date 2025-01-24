import axios from "axios"

export const apiInstanceFlask = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_FLASK,
    headers: {
        "Content-Type": "application/json"
    }
})