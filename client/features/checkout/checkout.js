import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIncompleteOrders, createNewOrder } from "../../store/ordersSlice";
import { useNavigate } from "react-router-dom";
import { me } from "../auth/authSlice";
import { getOrderListings,deleteAllCart } from "../../store/orderListingsSlice";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const Checkout = () => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const userId = useSelector((state) => state.auth.me.id);
  const orders = useSelector((state) => state.orders.orders);
  const orderListings = useSelector((state) => state.orderListings.orderListings);
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
  
  const handleCompleteCheckout = async () => {
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }
  
    const cardElement = elements.getElement(CardElement);
  
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });
  
    if (error) {
      console.error(error);
      // Handle payment error
    } else {
      const cartTotal = orderListings.reduce(
        (total, orderListing) =>
          total + orderListing.listing.price * orderListing.quantity,
        0
      );

      const response = await fetch(`/api/orderListings/checkout/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          cartTotal,
          userId,
          currentOrderId: orders[0].id
        }),
      });

      const paymentResult = await response.json();

      if (paymentResult.success) {
        dispatch(deleteAllCart(orders[0].id));
        dispatch(createNewOrder({ userId }));
        navigate("/confirmation");
      } else {
        console.error("Payment failed");
      }
    }
  };

  if (!userId || orders.length === 0 || !orderListings) {
    return null;
  }

  return (
    <>
      <div className="cart-container">
        <h1 id="order-details-title">Order Details</h1>
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
          <h2>Enter Payment Information</h2>
          <div className="input-group">
            <label>Card Number</label>
            <CardElement
            />
          </div>
          <button
            className="complete-checkout-button"
            onClick={() => handleCompleteCheckout()}
          >
            Complete Payment
          </button>
        </div>
      </div>
    </>
  );
};

export default Checkout;