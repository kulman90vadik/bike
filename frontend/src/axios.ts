
import axios from 'axios';
// import dotenv from 'dotenv/config';

// dotenv.config();
console.log(import.meta.env.VITE_API_BASE_URL) 


const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
})


instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token');
    return config;
})

export default instance;


  //  "rewrites": [
  //   { "source": "/(.*)", "destination": "/" }
  // ]