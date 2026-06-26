// src/shared/api/apiClient.ts
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

export const apiClient: AxiosInstance = axios.create({
    baseURL: '/api/proxy',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Crucial for handling HTTP-only cookies if needed
});

// Request Interceptor
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Token injection is now handled securely on the server side by the Next.js BFF proxy!
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor: Handling global errors like 401 Unauthorized or 404 Not Found
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 404) {
            console.error(`API returned ${error.response?.status}! Redirecting to login...`);
            if (typeof window !== 'undefined') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);