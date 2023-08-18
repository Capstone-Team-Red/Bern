import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../store/store";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const role = useSelector((state) => state.auth.me.role);
  const id = useSelector((state) => state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in as a User or Renter */}{" "}
            {role === "User" ? (
              <React.Fragment>
                <NavLink className="navlinks" to="/home">Home 🏠</NavLink>
                <NavLink className="navlinks" to={`/users/${id}/edit`}>Edit Profile ✍🏼</NavLink>
                <NavLink className="navlinks" to="/renters">Instructors 🏃🏻‍♀️🏃🏻‍♂️</NavLink>
                <NavLink className="navlinks" to="/listings">Listings 📝</NavLink>
                <NavLink className="navlinks" to="/maps">Find Your Fit 🗺️</NavLink>
                <NavLink className="navlinks" id="cartlink" to="/cart">Cart 🛒</NavLink>
              </React.Fragment>
            ) : role === "Renter" ? (
              <React.Fragment>
                <NavLink className="navlinks" to="/home">Home</NavLink>
                <NavLink className="navlinks" to={`/listings/${id}/renterListings`}>My Listings 📝</NavLink>
                <NavLink className="navlinks" to={`/renters/${id}/edit`}>Edit Profile ✍🏼</NavLink>
                <NavLink className="navlinks" to={`/listings/${id}/add`}>Add Listing +📝</NavLink>
              </React.Fragment>
            ) : null}
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
          </div>
        ) : (
          <div className="navlinks-container">
            {/* The navbar will show these links before you log in */}
            <NavLink className="navlinks" to="/login">Login ⌨️</NavLink>
            <NavLink className="navlinks" to="/signup">Sign Up ✍🏽</NavLink>
            <NavLink className="navlinks" to="/listings">Listings 📝</NavLink>
            <NavLink className="navlinks" to="/maps">Find Your Fit 🗺️</NavLink>
            <NavLink className="navlinks" id="cartlink" to="/cart">Cart 🛒</NavLink>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
