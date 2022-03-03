import { createSlice } from "@reduxjs/toolkit";

export const stateSlice = createSlice({
  name: "currentState",
  initialState: {
    bookingInfo: null,
    serviceSelected: null,
    companyInfo: null,
  },
  reducers: {
    selectBookingSlot: (state, action) => {
      state.bookingInfo = action.payload.bookingInfo;
    },
    selectService: (state, action) => {
      state.serviceSelected = action.payload;
    },
    setCompInfo: (state, action) => {
      state.companyInfo = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectBookingSlot, selectService, setCompInfo } =
  stateSlice.actions;

export default stateSlice.reducer;
