import React from "react";
import { useSelector } from "react-redux";

const Confirmation = () => {
  const orderListings = useSelector(
    (state) => state.orderListings.orderListings
  );

  const cartTotal = orderListings.reduce(
    (total, orderListing) =>
      total + orderListing.listing.price * orderListing.quantity,
    0
  );

  return (
    <div className="confirmation-container">
      <h1>Thank you for your order!</h1>
      <p>Your order has been successfully placed.</p>
    </div>
  );
};

export default Confirmation;