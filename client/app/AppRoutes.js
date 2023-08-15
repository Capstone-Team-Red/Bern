import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import Home from "../features/home/Home";
import { me } from "../store/store";
// one thing you might consider if you have some time at the end for refactoring/polishing your code is to make a /features/index.js file that imports everything in /features/... and then exports it. That way you can have one big import from ../features here
import { AllListings } from "../features/listings/AllListings";
import SingleListing from "../features/listings/SingleListing";
import { AllRenters } from "../features/renters/AllRenters";
import SingleRenter from "../features/renters/SingleRenter";
import { Cart } from "../features/cart/cart";
import Checkout from "../features/checkout/checkout";
import Confirmation from "../features/checkout/confirmation";
import Landing from "../features/home/Landing";
import EditRenter from "../features/renter/EditRenter";
import CreateListing from "../features/listings/CreateListing";
import RenterListings from "../features/listings/RenterListings";
import EditListing from "../features/listings/EditListing";
import SingleRentee from "../features/rentee/SingleRentee";
import EditRentee from "../features/rentee/EditRentee";
import Maps from "../features/maps/Maps";

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/home" element={<Landing />} />
          <Route path="/maps" element={<Maps />} />
          <Route path="/listings" element={<AllListings />} />
          <Route path="/listings/:id" element={<SingleListing />} />
          <Route path="/renters" element={<AllRenters />} />
          <Route path="/renters/:id" element={<SingleRenter />} />
          <Route path="/users/:id" element={<SingleRentee />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/confirmation" element={<Confirmation/> } />
          <Route path="/renters/:id/edit" element={<EditRenter />} />
          <Route path="/listings/:id/add" element={<CreateListing />} />
          <Route
            path="/listings/:id/renterListings"
            element={<RenterListings />}
          />
          <Route path="/listings/:id/edit" element={<EditListing />} />
          <Route path="/users/:id/edit" element={<EditRentee />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/*"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Login" />}
          />
          <Route
            path="/signup"
            element={<AuthForm name="signup" displayName="Sign Up" />}
          />
          <Route path="/listings" element={<AllListings />} />
          <Route path="/listings/:id" element={<SingleListing />} />
          <Route path="/maps" element={<Maps />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
