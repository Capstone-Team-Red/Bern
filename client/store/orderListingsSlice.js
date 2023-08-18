import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

// this returns all listings in a certain order
export const getOrderListings = createAsyncThunk('getOrderListings', async (id) => {
    try {
      const {data} = await axios.get(`/api/orders/${id}/orderListings`);
    return data
  } catch (err) {
    console.log(err)
  }
})

export const incrementListing = createAsyncThunk(
    "incrementCartListing",
    async (id) => {
      try {
        const {data} = await axios.put(`/api/orderListings/${id}/increase`);
        return data;
      } catch (err) {
        console.log(err);
      }
    }
  );
  
  export const decrementListing = createAsyncThunk(
    "decrementCartListing",
    async (id) => {
      try {
        const {data} = await axios.put(`/api/orderListings/${id}/decrease`);
        return data
      } catch (err) {
        console.log(err);
      }
    }
  );

  export const removeFromCart = createAsyncThunk("removeFromCart", async (id) => {
    const { data } = await axios.delete(`/api/orderListings/${id}`);
    return data;
  });

  export const addToCart = createAsyncThunk(
    'addToCart',
    async ({ userId, listingId, price, orderId, quantity }) => {
      try {
        const { data } = await axios.post(`/api/orderListings`, {
          userId,
          listingId,
          price,
          orderId,
          quantity,
        });
        return data;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  );

  export const deleteAllCart = createAsyncThunk("deleteAllCart", async (id) => {
    const {data} = await axios.delete(`/api/orderListings/${id}/destroy`);
    return data;
  });

const orderListingsSlice = createSlice({
  name: 'orderListings',
  initialState: {
    orderListings: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getOrderListings.fulfilled, (state, action) => {
      state.orderListings = action.payload;
    })
    .addCase(incrementListing.fulfilled, (state, { payload }) => { // Now payload is the updated orderListing
        const updatedOrderListing = state.orderListings.find(item => item.id === payload.id);
        if (updatedOrderListing) {
          updatedOrderListing.quantity = payload.quantity;
        }
      })
      .addCase(decrementListing.fulfilled, (state, { payload }) => {
        const updatedOrderListing = state.orderListings.find(item => item.id === payload.id);
        if (updatedOrderListing) {
          updatedOrderListing.quantity = payload.quantity;
        }
      })
      .addCase(addToCart.fulfilled, (state, { payload }) => {
        if (payload.userId) {
          // If the payload contains a valid userId, update the state for authorized users
          state.orderListings.push(payload);
        } else {
          // For unauthorized users, handle cart items in local storage
          const storedListings = JSON.parse(localStorage.getItem('listings')) || [];
          const existingListing = storedListings.find((p) => p.id === payload.listingId);
  
          if (existingListing) {
            // If the listing is already in the cart, update the quantity
            existingListing.quantity++;
          } else {
            // Otherwise, add the listing to the cart
            storedListings.push({
              id: payload.listingId,
              price: payload.price,
              quantity: 1,
            });
          }
          // Update local storage
          localStorage.setItem('listings', JSON.stringify(storedListings));
        }
      })
      .addCase(removeFromCart.fulfilled, (state, { payload }) => {
        state.orderListings = state.orderListings.filter((listing) => listing.id !== payload.id);
      })
      .addCase(deleteAllCart.fulfilled, (state, {payload}) => {
        state.orderListings = [];
      })
  }
});

export const selectOrderListings = state => {
  return state.orderListings.orderListings
}

export default orderListingsSlice.reducer
