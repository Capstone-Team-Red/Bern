import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getIncompleteOrders } from "../../store/ordersSlice";
import { me } from "../auth/authSlice";
import {
  getOrderListings,
  incrementListing,
  decrementListing,
  removeFromCart,
  deleteAllCart,
} from "../../store/orderListingsSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.me.id);
  const orders = useSelector((state) => state.orders.orders);
  const orderListings = useSelector(
    (state) => state.orderListings.orderListings
  );

  useEffect(() => {
    dispatch(me());
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(getIncompleteOrders(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (orders.length > 0) {
      const currentCart = orders[0];
      dispatch(getOrderListings(currentCart.id));
    }
  }, [dispatch, orders]);

  const handleIncrement = (orderListingId) => {
    dispatch(incrementListing(orderListingId));
  };

  const handleDecrement = (orderListingId) => {
    dispatch(decrementListing(orderListingId));
  };

  const handleRemove = (orderListingId) => {
    dispatch(removeFromCart(orderListingId));
  };

  const handleCompleteCheckout = () => {
    dispatch(deleteAllCart(orders[0].id));
  };

  if (!userId || orders.length === 0 || !orderListings) {
    return null;
  }

  return (
    <>
      <div className="cart-container">
        <h1>Order Details</h1>
        {orders.map((order) => (
          <div className="cart-item" key={order.id}>
            {orderListings.length > 0 ? (
              orderListings.map((orderListing) => (
                <div key={orderListing.id}>
                  {orderListing.listing ? (
                    <>
                      <p className="listing-name">
                        Listing: {orderListing.listing.name}
                      </p>
                      <p>
                        Price: {orderListing.listing.price}(
                        {orderListing.quantity}) = $
                        {orderListing.listing.price * orderListing.quantity}
                      </p>
                      <p className="listing-quantity">
                        Quantity: {orderListing.quantity}{" "}
                        <button
                          onClick={() => handleIncrement(orderListing.id)}
                        >
                          +
                        </button>
                        <button
                          onClick={() => handleDecrement(orderListing.id)}
                        >
                          -
                        </button>
                      </p>
                      <p>
                        <button onClick={() => handleRemove(orderListing.id)}>
                          Remove Item
                        </button>
                      </p>
                    </>
                  ) : (
                    <p>Listing data not available...</p>
                  )}
                </div>
              ))
            ) : (
              <p>Your cart is empty!</p>
            )}
            <h2 className="cart-total">
              Your total is $
              {orderListings.reduce(
                (total, orderListing) =>
                  total + orderListing.listing.price * orderListing.quantity,
                0
              )}
            </h2>
          </div>
        ))}
        <div>
          <Link to="/home">
            {" "}
            <button
              className="complete-checkout-button"
              onClick={() => handleCompleteCheckout()}
            >
              Confirm Order
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Checkout;
