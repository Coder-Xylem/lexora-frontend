import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: ('https://lexora-backend.vercel.app/api/'),
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': true
    
  }
});

export default axiosInstance;
