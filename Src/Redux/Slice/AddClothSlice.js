import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  address: '',
  pickupDate: '',
  pickupTime: '',
  cloths: [],
  orderNo: '',
  status: '',
  price: 0,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setPickupDate: (state, action) => {
      state.pickupDate = action.payload;
    },
    setPickupTime: (state, action) => {
      state.pickupTime = action.payload;
    },
    addCloth: (state, action) => {
      state.cloths.push(action.payload);
    },
    updateCloth: (state, action) => {
      const { index, data } = action.payload;
      state.cloths[index] = { ...state.cloths[index], ...data };
    },
    removeCloth: (state, action) => {
      state.cloths = state.cloths.filter(cloth => cloth.id !== action.payload);
    },
    setOrderNo: (state, action) => {
      state.orderNo = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    resetOrder: () => initialState,
  },
});

export const {
  setAddress,
  setPickupDate,
  setPickupTime,
  addCloth,         // This should be exported
  updateCloth,
  removeCloth,
  setOrderNo,
  setStatus,
  setPrice,
  resetOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
