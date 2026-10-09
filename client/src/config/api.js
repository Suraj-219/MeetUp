import axios from "axios";

export const API_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

if (import.meta.env.PROD && /localhost|127\.0\.0\.1/i.test(API_URL)) {
    throw new Error("Set VITE_BASE_URL to your deployed API URL in the Vercel project settings.");
}

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
})

api.interceptors.request.use(async (config)=> {
    try {
        if(window.Clerk?.sessions){
            const token = await window.Clerk.session.getToken();
            if(token){
                config.headers.Authorization = `Bearer ${token}`
            }
        }
    } catch(error){
        console.error("Error in API request interceptor getting Clerk token:", error);
    }
    return config;
})

export default api;