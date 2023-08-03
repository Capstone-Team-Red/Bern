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

  const formatDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    return formattedDate;
  };

  return (
    <>
      <div className="all-listings-container">
        {listings ? (
          listings.map((listing) => (
            <div className="listing-container" key={listing.id}>
              <NavLink to={`/listings/${listing.id}`}>
                <h3>{listing.name}</h3>
                <img src={listing.image} alt={listing.name} />
                <p><span className="listing-details">Class Type: </span>{listing.classtype}</p>
                <p><span className="listing-details">Address: </span>{listing.address}, {listing.city}, {listing.state}, {listing.zipcode}</p>
                <p><span className="listing-details">Date & Time: </span>{formatDate(listing.date)} @ {listing.time}</p>
                <p><span className="listing-details">Spots Available: </span>{listing.stock}</p>
                <p><span className="listing-details">Price: </span>${listing.price}</p>
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
