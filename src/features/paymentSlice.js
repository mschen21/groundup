import { createSlice } from "@reduxjs/toolkit";

export const paymentSlice = createSlice({
  name: "paymentState",
  initialState: {
    paymentState: null,
    bookingDetails: null,
  },
  reducers: {
    selectPaymentType: (state, action) => {
      state.paymentState = action.payload;
    },
    setBookingPerson: (state, action) => {
      state.bookingDetails = action.payload;
    },
  },
});

export const { selectPaymentType, setBookingPerson } = paymentSlice.actions;

export default paymentSlice.reducer;
