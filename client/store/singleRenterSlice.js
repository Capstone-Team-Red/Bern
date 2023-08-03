import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const getSingleRenter = createAsyncThunk('renters/renterId', async id => {
  try {
    const {data} = await axios.get(`/api/renters/${id}`)
    return data
  } catch (err) {
    console.log(err)
  }
});

export const updateRenter = createAsyncThunk('renters/updateRenter', async ({ token, id, renterData }) => {
  try {
    const {data} = await axios.put(`/api/renters/${id}/edit`, renterData, {
      headers: {
          Authorization: `Bearer ${token}`,
      }
    })
    return data
  } catch (err) {
    console.log(err)
  }
});

const initialState = {}

const singleRenterSlice = createSlice({
  name: 'singleRenter',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getSingleRenter.fulfilled, (state, action) => {
      return action.payload
    });
    builder.addCase(getSingleRenter.rejected, (state, action) => {
      state.error = action.payload;
  });
    builder.addCase(updateRenter.fulfilled, (state, action) => {
        return action.payload;
      });
    builder.addCase(updateRenter.rejected, (state, action) => {
        state.error = action.payload;
    });
  }
})

export const selectSingleRenter = state => {
  return state.singleRenterSlice
}

export default singleRenterSlice.reducer