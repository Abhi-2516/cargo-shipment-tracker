import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const shipmentSlice = createSlice({
  name: "shipments",
  initialState,
  reducers: {
    setShipments: (state, action) => {
      return action.payload;
    },
  },
});

export const { setShipments } = shipmentSlice.actions;
export default shipmentSlice.reducer;
