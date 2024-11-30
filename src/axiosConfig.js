import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://testb-phi.vercel.app/api',
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json', // Set necessary headers
  }
});

export default axiosInstance;
