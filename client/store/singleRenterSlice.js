import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const getSingleRenter = createAsyncThunk('renters/renterId', async id => {
  try {
    const {data} = await axios.get(`/api/renters/${id}`)
    return data
  } catch (err) {
    console.log(err)
  }
})

const initialState = {}

const singleRenterSlice = createSlice({
  name: 'singleRenter',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getSingleRenter.fulfilled, (state, action) => {
      return action.payload
    })
  }
})

export const selectSingleRenter = state => {
  return state.singleRenterSlice
}

export default singleRenterSlice.reducer