import { configureStore } from "@reduxjs/toolkit";
import stateReducer from "./features/stateSlice";
import paymentReducer from "./features/paymentSlice";

export default configureStore({
  reducer: {
    current: stateReducer,
    payment: paymentReducer,
  },
});
