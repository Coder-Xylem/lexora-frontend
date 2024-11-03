import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:54000/api', // Backend server URL
  withCredentials: true,
});

export default axiosInstance;
