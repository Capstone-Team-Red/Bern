import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
            {/* The nested ternary logic here is a little hard to follow -- I recommend having two separate statements like {role === "Role" && <React.Fragment>...} */}
            {role === "User" ? (
              <React.Fragment>
                <Link to="/home">Home</Link>
                <Link to={`/users/${id}/edit`}>Edit Profile</Link>
                <Link to="/renters">Renters</Link>
                <Link to="/listings">Listings</Link>
                <Link to="/cart">Cart</Link>
              </React.Fragment>
            ) : role === "Renter" ? (
              <React.Fragment>
                <Link to="/home">Home</Link>
                <Link to={`/listings/${id}/renterListings`}>My Listings</Link>
                <Link to="/cart">Cart</Link>
                <Link to={`/renters/${id}/edit`}>Edit Profile</Link>
                <Link to={`/listings/${id}/add`}>Add Listing</Link>
              </React.Fragment>
            ) : null}
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
