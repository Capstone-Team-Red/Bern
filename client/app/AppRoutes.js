import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import Home from "../features/home/Home";
import { me } from "../store/store";
import { AllListings } from "../features/listings/AllListings";
import SingleListing from "../features/listings/SingleListing";
import { AllRenters } from "../features/renters/AllRenters";
import SingleRenter from "../features/renters/SingleRenter";
import { Cart } from "../features/cart/cart";
import Checkout from "../features/checkout/checkout";
import Confirmation from "../features/checkout/confirmation";
import EditRenter from "../features/renter/EditRenter";
import CreateListing from "../features/listings/CreateListing";
import RenterListings from "../features/listings/RenterListings";
import EditListing from "../features/listings/EditListing";
import SingleRentee from "../features/rentee/SingleRentee";
import EditRentee from "../features/rentee/EditRentee";
import Maps from "../features/maps/Maps";
import LandingPage from "../features/landing/LandingPage";

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const role = useSelector((state) => state.auth.me.role);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <div>
        {role === "User" ? (
            <Routes>
              <Route path="/*" element={<Home />} />
              <Route path="/" element={<LandingPage />} />
              <Route path="/maps" element={<Maps />} />
              <Route path="/listings" element={<AllListings />} />
              <Route path="/listings/:id" element={<SingleListing />} />
              <Route path="/renters" element={<AllRenters />} />
              <Route path="/renters/:id" element={<SingleRenter />} />
              <Route path="/users/:id" element={<SingleRentee />} />
              <Route path="/users/:id/edit" element={<EditRentee />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout/:id" element={<Checkout />} />
              <Route path="/confirmation" element={<Confirmation/> } />
            </Routes>
          ) : role === "Renter" ? (
            <Routes>
              <Route path="/*" element={<Home />} />
              <Route path="/" element={<LandingPage />} />
              <Route path="/listings" element={<AllListings />} />
              <Route path="/renters" element={<AllRenters />} />
              <Route path="/renters/:id/edit" element={<EditRenter />} />
              <Route path="/listings/:id/add" element={<CreateListing />} />
              <Route path="/listings/:id/renterListings" element={<RenterListings />} />
              <Route path="/listings/:id/edit" element={<EditListing />} />
            </Routes>
          ) : null}
        </div>
      ) : (
        <Routes>
          <Route
            path="/" element={<LandingPage />}
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
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;