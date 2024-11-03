import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://testb-phi.vercel.app/api', // Backend server URL
  withCredentials: true,
});

export default axiosInstance;
