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
      <div className="all-listings-container">
        {renters ? (
          renters.map((renter) => (
            <div className="listing-container" key={renter.id}>
              <NavLink to={`/renters/${renter.id}`}>
                <p id="listing-name">{renter.firstname} {renter.lastname}</p>
                <p id="listing-name">Username: {renter.username}</p>
                <div className="all-listing-details">
                  <p>Email: {renter.email}</p>
                </div>
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
