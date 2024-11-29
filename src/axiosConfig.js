import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://testb-phi.vercel.app',
  withCredentials: true, });

export default axiosInstance;
