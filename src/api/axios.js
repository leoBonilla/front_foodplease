import axios from 'axios';


const API_URL = 'http://ec2-18-188-232-42.us-east-2.compute.amazonaws.com/api/'; 

const axiosInstance = axios.create({
    baseURL: API_URL,
});


let setLoadingState = null;


export const setLoading = (loadingHandler) => {
    setLoadingState = loadingHandler;
};


axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    if (setLoadingState) {
        setLoadingState(true); 
    }

    return config;
}, (error) => {

    if (setLoadingState) {
        setLoadingState(false);
    }
    return Promise.reject(error);
});


axiosInstance.interceptors.response.use((response) => {

    if (setLoadingState) {
        setLoadingState(false);
    }
    return response;
}, (error) => {

    if (setLoadingState) {
        setLoadingState(false);
    }
    return Promise.reject(error);
});

export default axiosInstance;
