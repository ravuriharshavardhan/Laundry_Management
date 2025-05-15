import axios from 'axios';
import axiosInstance from '../Redux/Slice/axiosInstance';

export const fetchOrders = async () => {
  try {
    const response = await axiosInstance.get('/orders/orders');
    return response.data; // return the list of orders
  } catch (error) {
    throw new Error(error?.response?.data?.message || 'Failed to fetch orders');
  }
};
