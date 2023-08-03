import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AuthForm from '../features/auth/AuthForm';
import Home from '../features/home/Home';
import { me } from '../store/store';
import {AllListings} from "../features/listings/AllListings"
import SingleListing from '../features/listings/SingleListing';
import {AllRenters} from "../features/renters/AllRenters"
import SingleRenter from '../features/renters/SingleRenter';
import {Cart} from '../features/cart/cart';
import Checkout from '../features/checkout/checkout';
import Landing from '../features/home/Landing';

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
          <Route path="/listings" element={<AllListings />} />
          <Route path="/listings/:id" element={<SingleListing />} />
          <Route path="/renters" element={<AllRenters />} />
          <Route path="/renters/:id" element={<SingleRenter />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout/>} />
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
          <Route path="/cart" element={<Cart />} />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;

