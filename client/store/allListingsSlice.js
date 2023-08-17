import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const getAllListings = createAsyncThunk('getAllListings', async () => {
  try {
    const {data} = await axios.get(`/api/listings`);
    return data
  } catch (err) {
    console.log(err)
  }
});

export const getRenterListings = createAsyncThunk('getRenterListings', async (renterId) => {
  try {
    const {data} = await axios.get(`/api/listings/${renterId}/renterListings`);
    return data
  } catch (err) {
    console.log(err)
  }
});

export const addListing = createAsyncThunk("listings/addListing", async ({ name, classtype, address, city, state, zipcode, date, time, price, stock, lat, lng, renterId }) => {
  try {
      const { data } = await axios.post(`/api/listings/${renterId}/add`, {
        name, classtype, address, city, state, zipcode, date, time, price, stock, lat, lng
      });
      return data;
  } catch (err) {
      console.error("Failed to create new listing:", err);
      throw err;
  }
});

const allListingsSlice = createSlice({
  name: 'listings',
  initialState: {
    listings: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllListings.fulfilled, (state, { payload }) => {
      state.listings = payload;
    });
    builder.addCase(getRenterListings.fulfilled, (state, { payload }) => {
      state.listings = payload;
    });
    builder.addCase(addListing.fulfilled, (state, { payload }) => {
      const newListing = { ...payload, renterId: payload.renterId };
      return { ...state, listings: [...state.listings, newListing] }
    });
  }
})

export const selectListings = state => {
  return state.listings.listings;
}

export default allListingsSlice.reducer;
