import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIncompleteOrders, createNewOrder } from "../../store/ordersSlice";
import { useNavigate } from "react-router-dom";
import { me } from "../auth/authSlice";

import {
  getOrderListings,
  deleteAllCart,
} from "../../store/orderListingsSlice";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";



const Checkout = () => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const userId = useSelector((state) => state.auth.me.id);
  const orders = useSelector((state) => state.orders.orders);
  const orderListings = useSelector(
    (state) => state.orderListings.orderListings
  );
  const navigate = useNavigate();

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
  
    const handleSubmit = async (event) => {
      // We don't want to let default form submission happen here,
      // which would refresh the page.
      event.preventDefault();
 
      if (!stripe || !elements) {
        // Stripe.js hasn't yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }
  
      const result = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        confirmParams: {
          return_url: "http://localhost:8080/home",
        },
      });
  
      if (result.error) {
        // Show error to your customer (for example, payment details incomplete)
        console.log(result.error.message);
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
            <script src="https://js.stripe.com/v3/" async></script>
              Your total is $
              {orderListings.reduce(
                (total, orderListing) =>
                  total + orderListing.listing.price * orderListing.quantity,
                0
              )}
            </h2>
          </div>
        ))}
        <div className="payment-form">
          <form onSubmit={handleSubmit}>
          <h2>Enter Payment Information</h2>
          <script src="https://js.stripe.com/v3/" async></script>
          <div className="input-group">
            <label>Card Number</label>
            <PaymentElement/>
          </div>
          </form>
          <button
            className="complete-checkout-button"
            // onClick={() => handleCompleteCheckout()}
          >
            Complete Payment
          </button>
        </div>
      </div>
    </>
  );
};

export default Checkout;