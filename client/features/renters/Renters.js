import React from "react";
import { Link } from "react-router-dom";

const Renters = ({ renter, onDeleteProducts }) => {
  return (
    <section>
      <Link to={`/renters/${renter.id}`}>
        <div className="listing-name">{renter.firstname}</div>
        <div className="listing-price">${renter.email}</div>
      </Link>
    </section>
  );
};

export default Renters;
