import React from "react";
import { Link } from "react-router-dom";

const Listings = ({ listing }) => {
  return (
    <section>
      <Link to={`/listings/${listing.id}`}>
        <img src={listing.image} alt={listing.name} />
        <div className="listing-name">{listing.name}</div>
        <div className="listing-price">${listing.price}</div>
      </Link>
    </section>
  );
};

export default Listings;
