import { configureStore } from "@reduxjs/toolkit";
import shipmentReducer from "./store/shipmentSlice"; // Ensure this file exists

const store = configureStore({
  reducer: {
    shipments: shipmentReducer,
  },
});

export default store;
