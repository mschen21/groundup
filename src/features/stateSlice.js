import { createSlice } from "@reduxjs/toolkit";

export const stateSlice = createSlice({
  name: "currentState",
  initialState: {
    bookingInfo: null,
    serviceSelected: null,
  },
  reducers: {
    selectBookingSlot: (state, action) => {
      state.bookingInfo = action.payload.bookingInfo;
    },
    selectService: (state, action) => {
      state.serviceSelected = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectBookingSlot, selectService } = stateSlice.actions;

export default stateSlice.reducer;
