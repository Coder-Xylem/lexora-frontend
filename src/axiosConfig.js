import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://lexora-backend-lbmv.vercel.app/api/',
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  }
});

export default axiosInstance;
