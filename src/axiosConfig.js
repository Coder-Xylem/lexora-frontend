import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://lexora-backend-3mod.onrender.com/api/',
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  }
});

export default axiosInstance;
