import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getRenterListings,
  selectListings,
} from "../../store/allListingsSlice";
import { NavLink, useParams } from "react-router-dom";

export function RenterListings() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getRenterListings(id));
  }, [dispatch, id]);

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
      <div className="renter-listings-container">
        {listings ? (
          // consider making a component for one individual listing that you can use in this map
          listings.map((listing) => (
            <div className="listing-container" key={listing.id}>
                <h3>{listing.name}</h3>
                <img src={listing.image} alt={listing.name} />
                <p><span className="listing-details">Class Type: </span>{listing.classtype}</p>
                <p><span className="listing-details">Address: </span>{listing.address}, {listing.city}, {listing.state}, {listing.zipcode}</p>
                <p><span className="listing-details">Date & Time: </span>{formatDate(listing.date)} @ {listing.time}</p>
                <p><span className="listing-details">Spots Available: </span>{listing.stock}</p>
                <p><span className="listing-details">Price: </span>${listing.price}</p>
                <NavLink to={`/listings/${listing.id}/edit`}>Edit Listing</NavLink>
            </div>
          ))
        ) : (
          <p>Loading listings...</p>
        )}
      </div>
    </>
  );
}

export default RenterListings;
