import React from "react";
import { useSelector } from "react-redux";
import { selectListings } from "../../store/allListingsSlice";
import { NavLink } from "react-router-dom";

/**
 * COMPONENT
 */
const Landing = (props) => {
  const listings = useSelector(selectListings);
  const username = useSelector((state) => state.auth.me.username);
  return (
    <div>
      <h3 className="welcome">Welcome, {username}!</h3>
      <h3>Recommended for you</h3>
      <div className="all-listings-container">
        {listings ? (
          listings.slice(12, 15).map((listing) => (
            <div className="listing-container" key={listing.id}>
              <NavLink to={`/listings/${listing.id}`}>
                <p id="listing-name">{listing.name}</p>
              </NavLink>
              <div className="all-listing-details">
                <img src={listing.image} alt={listing.name} />
              </div>
            </div>
          ))
        ) : (
          <p>No listings found.</p>
        )}
      </div>
    </div>
  );
};

export default Landing;
