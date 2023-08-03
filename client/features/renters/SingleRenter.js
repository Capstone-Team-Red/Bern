import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleRenter } from "../../store/singleRenterSlice";
import { useParams } from "react-router-dom";
// import { addToCart } from "../../store/orderProductsSlice";

const SingleRenter = () => {
  const dispatch = useDispatch();
  // const userId = useSelector((state) => state.auth.me.id);
  // const orders = useSelector((state) => state.orders.orders);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getSingleRenter(id));
    }
  }, [dispatch, id]);

  const renter = useSelector((state) => state.singleRenter);

  return (
    <div className="listing-details">
      {renter ? (
        <>
          <div>
            <h2>Renter Details</h2>
            <p>Name: {renter.firstname} {renter.lastname}</p>
            <p>Username: {renter.username}</p>
            <p>Email: {renter.email}</p>
          </div>
        </>
      ) : (
        <p className="loading-text">Loading Renter...</p>
      )}
    </div>
  );
};

export default SingleRenter;
