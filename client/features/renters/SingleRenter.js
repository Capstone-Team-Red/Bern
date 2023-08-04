import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleRenter } from "../../store/singleRenterSlice";
import { useParams } from "react-router-dom";

const SingleRenter = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getSingleRenter(id));
    }
  }, [dispatch, id]);

  const renter = useSelector((state) => state.singleRenter);

  return (
      <div>
      <h1>Renter Contact Info</h1>
      {renter ? (
        <>
          <div className="listing-container">
            <p><span className="single-listing-details">Name:</span> {renter.firstname} {renter.lastname}</p>
            <p><span className="single-listing-details">Email:</span> {renter.email}</p>
          </div>
        </>
      ) : (
        <p className="loading-text">Loading Renter...</p>
      )}
    </div>
  );
};

export default SingleRenter;
