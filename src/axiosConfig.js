import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://lexora-backend-0aed.onrender.com/api/',
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  }
});

export default axiosInstance;
