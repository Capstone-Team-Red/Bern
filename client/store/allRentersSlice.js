import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllRenters = createAsyncThunk("getAllRenters", async () => {
  try {
    const { data } = await axios.get(`/api/renters`);
    return data;
  } catch (err) {
    console.log(err);
  }
});

const allRentersSlice = createSlice({
  name: "allRenters",
  initialState: {
    renters: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllRenters.fulfilled, (state, { payload }) => {
        state.renters = payload;
      })
  },
});

export const selectAllRenters = (state) => {
  return state.allRenters.renters;
};

export default allRentersSlice.reducer;