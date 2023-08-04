import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleUser } from "../../store/userSlice";

const SingleRentee = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.singleUser);
  const { id } = useParams();
  useEffect(() => {
    dispatch(getSingleUser(id));
  }, []);

  return (
    <div className="user-details">
      {user ? (
        <>
          <div>
            <h2>User Details</h2>
            <p>
              Name: {user.firstname} {user.lastname}
            </p>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
          </div>
        </>
      ) : (
        <p className="loading-text">Loading User...</p>
      )}
    </div>
  );
};

export default SingleRentee;
