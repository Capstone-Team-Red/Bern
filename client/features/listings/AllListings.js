import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllListings,
  selectListings,
} from "../../store/allListingsSlice";
import { NavLink } from "react-router-dom";

export function AllListings() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllListings());
  }, [dispatch]);

  const listings = useSelector(selectListings);

  return (
    <>
      <div className="all-listings-container">
        {listings ? (
          listings.map((listing) => (
            <div className="listing-container" key={listing.id}>
              <NavLink to={`/listings/${listing.id}`}>
                <p id="listing-name">{listing.name}</p>

                <div className="all-listing-details">
                  <img src={listing.image} alt={listing.name} />
                  <p>Price: {listing.price}</p>
                </div>
              </NavLink>
            </div>
          ))
        ) : (
          <p>Loading listings...</p>
        )}
      </div>
    </>
  );
}

export default AllListings;
