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

export const addRenter = createAsyncThunk(
  "addRenter",
  async ({ username, email, name, password, address, phone }) => {
    const { data } = await axios.post("/api/renters", {
      username,
      email,
      name,
      password,
      address,
      phone,
    });
    return data;
  }
);

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
      .addCase(addRenter.fulfilled, (state, { payload }) => {
        state.renters.push(payload);
      });
  },
});

export const selectAllRenters = (state) => {
  return state.renters;
};

export default allRentersSlice.reducer;