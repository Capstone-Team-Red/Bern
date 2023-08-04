import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllRenters,
  selectAllRenters,
} from "../../store/allRentersSlice";
import { NavLink } from "react-router-dom";

export function AllRenters() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRenters());
  }, [dispatch]);

  const renters = useSelector(selectAllRenters);

  return (
    <>
      <h1>Renters Contact Info</h1>
      <div className="all-listings-container">
        {renters ? (
          renters.map((renter) => (
            <div className="listing-container" key={renter.id}>
              <NavLink to={`/renters/${renter.id}`}>
                <p><span className="single-listing-details">Name:</span> {renter.firstname} {renter.lastname}</p>
                <p><span className="single-listing-details">Email:</span> {renter.email}</p>
              </NavLink>
            </div>
          ))
        ) : (
          <p>Loading Renters...</p>
        )}
      </div>
    </>
  );
}

export default AllRenters;
