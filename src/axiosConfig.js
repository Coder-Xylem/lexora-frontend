import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://testb-phi.vercel.app/api', // Ensure this is your backend’s URL
  withCredentials: true,  // Keeps cookies enabled for authentication
});

export default axiosInstance;
