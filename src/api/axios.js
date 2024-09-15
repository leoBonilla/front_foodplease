import axios from 'axios';

const API_URL = 'http://localhost:8000/api/'; // Reemplaza por la URL de tu API

const axiosInstance = axios.create({
    baseURL: API_URL,
});

// Agregar el token de autenticación en todas las solicitudes
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;
