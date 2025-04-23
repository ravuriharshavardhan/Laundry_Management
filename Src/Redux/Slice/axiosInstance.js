// src/utils/axiosInstance.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../../Config/Config';

// Create an axios instance with the base URL and timeout
const axiosInstance = axios.create({
  baseURL: Config.API_BASE_URL,  // API base URL from Config
  timeout: 10000,               // Timeout of 10 seconds for requests
  headers: {
    'Content-Type': 'application/json', // Default content type for requests
  },
});

// Add a request interceptor to add the Bearer token to all requests
axiosInstance.interceptors.request.use(
  async (config) => {
    // Get the token from AsyncStorage before making the request
    const token = await AsyncStorage.getItem('userToken');
    
    if (token) {
      // If token exists, add it to the Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Return the modified config object to continue with the request
    return config;
  },
  (error) => {
    // Handle any errors that occur during the request setup
    return Promise.reject(error);
  }
);

export default axiosInstance;
