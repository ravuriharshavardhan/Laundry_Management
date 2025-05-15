import axios from 'axios';

const BASE_URL = 'http://192.168.1.3:3000'; // Replace with your local IP and backend port

export const verifyOTP = async ({ email, otp }) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/otp-verification`, {
      email,
      otp,
    });
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.msg || 'Verification failed');
  }
};
