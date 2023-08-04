import React from "react";
import { Link } from "react-router-dom";

const Renters = ({ renter, onDeleteProducts }) => {
  return (
    <section>
      <Link to={`/renters/${renter.id}`}>
        <p><span className="single-listing-details">Name:</span> {renter.firstname} {renter.lastname}</p>
        <p><span className="single-listing-details">Email:</span> {renter.email}</p>
      </Link>
    </section>
  );
};

export default Renters;
