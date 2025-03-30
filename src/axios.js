
import Axios from 'axios';
import { useStore } from './useStore';

export const axios = Axios.create({
    baseURL: "https://portifolio-bc2d3-default-rtdb.firebaseio.com/"
});

axios.interceptors.request.use(config => {
    useStore.setState({ isLoading: true });
    return config;
}, error => {

    useStore.setState({ isLoading: false });
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    useStore.setState({ isLoading: false });
    return response;
}, error => {
    useStore.setState({ isLoading: false });

    return Promise.reject(error);
});
