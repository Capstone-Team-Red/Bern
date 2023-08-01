import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const getAllListings = createAsyncThunk('getAllListings', async () => {
  try {
    const {data} = await axios.get(`/api/listings`);
    return data
  } catch (err) {
    console.log(err)
  }
})

const allListingsSlice = createSlice({
  name: 'listings',
  initialState: {
    listings: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllListings.fulfilled, (state, {payload}) => {
      state.listings = payload
    })
  }
})

export const selectListings = state => {
  return state.listings.listings
}

export default allListingsSlice.reducer
