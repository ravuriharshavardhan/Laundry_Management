import axiosInstance from "../Redux/Slice/axiosInstance";


export const loginUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/api/auth/login', userData);
    return response.data;
  } catch (error) {
    const err = error?.response?.data || { msg: 'Login failed' };
    console.error('Login Error:', err);
    throw err;
  }
};
