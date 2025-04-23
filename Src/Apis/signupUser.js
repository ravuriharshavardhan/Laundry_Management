// src/utils/api.js

import axiosInstance from "../Redux/Slice/axiosInstance";


export const signupUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/api/auth/signup', userData);
    return response.data;
  } catch (error) {
    const err = error?.response?.data || { msg: 'Signup failed' };
    console.error('Signup Error:', err);
    throw err;
  }
};
