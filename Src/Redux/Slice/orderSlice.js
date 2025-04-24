// redux/orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Config from '../../Config/Config';

// Async thunk to fetch all orders
export const fetchOrders = createAsyncThunk('order/fetchOrders', async () => {
  const response = await axios.get(`${Config.API_BASE_URL}/api/orders/orders`);
  return response.data;
});

// Async thunk to fetch a single order
export const fetchOrderById = createAsyncThunk('order/fetchOrderById', async (orderId) => {
  const response = await axios.get(`${Config.API_BASE_URL}/api/orders/${orderId}`);
  return response.data;
});

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
      });
  },
});

export const { clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
