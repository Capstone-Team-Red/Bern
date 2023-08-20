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
          <div className="navlinks-container">
            {/* The navbar will show these links after you log in as a User or Renter */}{" "}
            {role === "User" ? (
              <React.Fragment>
                <NavLink to="/home"><h3 className="link">Home 🏠</h3></NavLink>
                <NavLink to={`/users/${id}/edit`}><h3 className="link">Edit Profile ✍🏼</h3></NavLink>
                <NavLink to="/renters"><h3 className="link">Instructors 🏃🏻‍♀️🏃🏻‍♂️</h3></NavLink>
                <NavLink to="/listings"><h3 className="link">Listings 📝</h3></NavLink>
                <NavLink to="/maps"><h3 className="link">Find Your Fit 🗺️</h3></NavLink>
                <NavLink to="/cart"><h3 className="link">Cart 🛒</h3></NavLink>
              </React.Fragment>
            ) : role === "Renter" ? (
              <React.Fragment>
                <NavLink to="/home"><h3 className="link">Home 🏠</h3></NavLink>
                <NavLink to={`/listings/${id}/renterListings`}><h3 className="link">My Listings 📝</h3></NavLink>
                <NavLink to={`/renters/${id}/edit`}><h3 className="link">Edit Profile ✍🏼</h3></NavLink>
                <NavLink to={`/listings/${id}/add`}><h3 className="link">Add Listing +📝</h3></NavLink>
              </React.Fragment>
            ) : null}
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
          </div>
        ) : (
          <div className="navlinks-container">
            {/* The navbar will show these links before you log in */}
            <NavLink to="/login"><h3 className="link">Login ⌨️</h3></NavLink>
            <NavLink to="/signup"><h3 className="link">Sign Up ✍🏽</h3></NavLink>
            <NavLink to="/listings"><h3 className="link">Listings 📝</h3></NavLink>
            <NavLink to="/maps"><h3 className="link">Find Your Fit 🗺️</h3></NavLink>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
