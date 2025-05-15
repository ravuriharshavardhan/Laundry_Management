import axios from 'axios';

const BASE_URL = 'http://192.168.1.3:3000'; // replace with your local IP

export const submitOrder = async (orderData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/orders/create-order`, orderData);
    return response.data;
  } catch (error) {
    throw new Error(error?.response?.data?.msg || 'Order submission failed');
  }
};
