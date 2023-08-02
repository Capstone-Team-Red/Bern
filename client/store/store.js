import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import allListingsSlice from "./allListingsSlice";
import singleListingSlice from "./singleListingSlice";
import ordersSlice from "./ordersSlice";
import orderListingsSlice from "./orderListingsSlice";
import allUsersSlice from "./allUsersSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    listings: allListingsSlice,
    singleListing: singleListingSlice,
    orders: ordersSlice,
    orderListings: orderListingsSlice,
    users: allUsersSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
