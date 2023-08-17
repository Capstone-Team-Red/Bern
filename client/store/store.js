import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import allListingsReducer from "./allListingsSlice";
import singleListingReducer from "./singleListingSlice";
import ordersReducer from "./ordersSlice";
import orderListingsReducer from "./orderListingsSlice";
import allUsersReducer from "./allUsersSlice";
import allRentersReducer from "./allRentersSlice";
import singleUserReducer from "./userSlice"
import singleRenterReducer from "./singleRenterSlice"
import allReviewsReducer from "./allReviewsSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    listings: allListingsReducer,
    singleListing: singleListingReducer,
    orders: ordersReducer,
    orderListings: orderListingsReducer,
    allUsers: allUsersReducer,
    allRenters: allRentersReducer,
    singleUser: singleUserReducer,
    singleRenter: singleRenterReducer,
    allReviews: allReviewsReducer

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
