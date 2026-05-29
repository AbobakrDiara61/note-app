import axios from 'axios'

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

api.interceptors.response.use((res) => res, async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/refresh')) {
        originalRequest._retry = true;
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/refresh`, {}, {
                withCredentials: true
            })
            return api(originalRequest); // Retry the original request with the new access token.
        } catch (refreshError) {
            return Promise.reject(refreshError);
        }
    }
    return Promise.reject(error);
})


export default api;