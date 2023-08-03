import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/store";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const role = useSelector((state) => state.auth.me.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <h1>Bern</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in as a User or Renter */}{" "}
            {role === "User" ? (
              <React.Fragment>
                <Link to="/home">Home</Link>
                <Link to="/renters">Renters</Link>
                <Link to="/listings">Listings</Link>
                <Link to="/cart">Cart</Link>
              </React.Fragment>
            ) : role === "Renter" ? (
              <React.Fragment>
                <Link to="/home">Home</Link>
                <Link to="/mylistings">My Listings</Link>
                <Link to="/cart">Cart</Link>
              </React.Fragment>
            ): null}
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/listings">Listings</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
