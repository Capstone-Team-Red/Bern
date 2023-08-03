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
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const Checkout = () => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

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

  const handleCompleteCheckout = async () => {
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error(error);
      // Handle payment error
    } else {
      // Calculate the total amount from orderListings
      const cartTotal = orderListings.reduce(
        (total, orderListing) =>
          total + orderListing.listing.price * orderListing.quantity,
        0
      );

      // Send paymentMethod.id and cartTotal to your server for payment processing
      const response = await fetch('/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          cartTotal, // Pass the calculated cart total
        }),
      });

      const paymentResult = await response.json();

      if (paymentResult.success) {
        // Payment successful, handle success scenario
        dispatch(deleteAllCart(orders[0].id));
      } else {
        console.error('Payment failed');
      }
    }
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
