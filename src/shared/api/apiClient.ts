// src/shared/api/apiClient.ts
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

export const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.SERVER_RESOURCE_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Crucial for handling HTTP-only cookies if needed
});

// Request Interceptor: e.g., dynamically attaching authorization headers
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // If you need to append tokens or custom logs, do it here
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor: Handling global errors like 401 Unauthorized or 403 Forbidden
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle automatic redirect to login page or token refresh logic
            console.error('Unauthorized! Redirecting to login...');
        }
        return Promise.reject(error);
    }
);