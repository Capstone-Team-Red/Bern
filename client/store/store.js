import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
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

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
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
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(logger),
});

const persistor = persistStore(store);

export { store, persistor };
export * from "../features/auth/authSlice";
