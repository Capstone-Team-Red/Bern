import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const getAllReviews = createAsyncThunk('getAllReviews', async () => {
    try {
      const {data} = await axios.get(`/api/reviews`);
      return data
    } catch (err) {
      console.log(err)
    }
  });

  export const addReview = createAsyncThunk("listings/addReview", async ({ rating, review_text, listingId, reviewer_user_id, reviewed_entity_id  }) => {
    try {
        const { data } = await axios.post(`/api/listings/${listingId}/add`, {
         rating, review_text,listingId, reviewer_user_id, reviewed_entity_id 
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
        return { ...state, reviews: [...state.reviews, newReview] }
      });
    }
  })
  
  export const selectReviews = state => {
    return state.reviews.reviews;
  }
  
  export default allReviewsSlice.reducer;