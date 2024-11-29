import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://testb-phi.vercel.app/api',
  withCredentials: true, });

export default axiosInstance;
