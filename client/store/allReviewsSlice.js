import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch all reviews
export const getAllReviews = createAsyncThunk('getAllReviews', async () => {
  try {
    const { data } = await axios.get(`/api/reviews`);
    return data;
  } catch (err) {
    console.log(err);
    throw err; 
  }
});

// Async thunk to add a new review
export const addReview = createAsyncThunk("api/addReview", async ({ rating, review_text, listingId, reviewer_user_id, reviewed_entity_id }) => {
  try {
    const { data } = await axios.post(`/listings/${listingId}`, {
      rating, review_text, reviewer_user_id, reviewed_entity_id
    });
    return data;
  } catch (err) {
    console.error("Failed to create new review", err);
    throw err; 
  }
});

const allReviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllReviews.fulfilled, (state, { payload }) => {
      state.reviews = payload;
    });
    builder.addCase(addReview.fulfilled, (state, { payload }) => {
      const newReview = { ...payload, reviewId: payload.reviewId };
      state.reviews.push(newReview);
    });
  }
});

export const selectReviews = state => state.reviews;

export default allReviewsSlice.reducer;
