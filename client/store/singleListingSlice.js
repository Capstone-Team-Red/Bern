import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSingleListing = createAsyncThunk(
  "listings/listingId",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/listings/${id}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateListing = createAsyncThunk(
  "updateListing",
  async ({ id, stock }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/listings/${id}`, { stock });
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data); 
    }
  }
);

const initialState = {};

const singleListingSlice = createSlice({
  name: "singleListing",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSingleListing.fulfilled, (state, { payload }) => {
        state.singleListing = payload;
      })
      .addCase(getSingleListing.rejected, (state) => {
        return initialState;
      })
      .addCase(updateListing.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(updateListing.rejected, (state) => {
        return initialState;
      });
  },
});

export const selectSingleListing = (state) => {
  return state.singleListing;
};

export default singleListingSlice.reducer;
