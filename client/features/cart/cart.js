import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIncompleteOrders } from '../../store/ordersSlice';
import { me } from '../auth/authSlice';
import { getOrderListings } from '../../store/orderListingsSlice';
import { incrementListing, decrementListing, removeFromCart } from '../../store/orderListingsSlice';
import { Link } from 'react-router-dom';

export const Cart = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.me.id);
  const orders = useSelector((state) => state.orders.orders);
  const orderListings = useSelector((state) => state.orderListings.orderListings || []);

  // Initialize the storedListings state with the listings from local storage or an empty array
  const [storedListings, setstoredListings] = useState(
    JSON.parse(localStorage.getItem('listings')) || []
  );

  useEffect(() => {
    localStorage.setItem('listings', JSON.stringify(storedListings));
  }, [storedListings]);

  useEffect(() => {
    dispatch(me());
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(getIncompleteOrders(userId));
      // If the user is authorized, initialize storedListings state with orderListings from redux store
      setstoredListings(orderListings);
    }
  }, [dispatch, userId, orderListings]);
 
  useEffect(() => {
    if (orders?.length > 0) {
      const currentCart = orders[0];
      dispatch(getOrderListings(currentCart.id));
    }
  }, [dispatch]);

  const handleIncrement = (orderListingId) => {
    dispatch(incrementListing(orderListingId));

    // Update the storedListings state after incrementing the listing quantity
    setstoredListings((prevListings) =>
    prevListings.map((listing) =>
    listing.id === orderListingId
          ? { ...listing, quantity: listing.quantity + 1 }
          : listing
      )
    );
  };

  const handleDecrement = (orderListingId) => {
    dispatch(decrementListing(orderListingId));

    // Update the storedListings state after decrementing the listing quantity
    setstoredListings((prevListings) =>
    prevListings.map((listing) =>
    listing.id === orderListingId
          ? { ...listing, quantity: listing.quantity - 1 }
          : listing
      )
    );
  };

  const handleRemove = (orderListingId) => {
    dispatch(removeFromCart(orderListingId));

    // Update the storedListings state after removing the listing
    setstoredListings((prevListings) =>
    prevListings.filter((listing) => listing.id !== orderListingId)
    );
  };

  // Return form for users that are NOT signed in
  if (!userId) {
    return (
      <div className="cart-container">
        <h1>Your Cart</h1>
        {storedListings && storedListings.length > 0 ? (
          <>
            {storedListings.map((storedListings) => (
              <div className="listing-item" key={storedListings.id}>
                {/* Display listing details for unauthorized users */}
                <p className="listing-name">Listing: {storedListings.name}</p>
                <p className="listing-price">Price: {storedListings.price}</p>
                <div className="listing-quantity">
                  Quantity: {storedListings.quantity}
                  <button onClick={() => handleIncrement(storedListings.id)}>
                    +
                  </button>
                  <button onClick={() => handleDecrement(storedListings.id)}>
                    -
                  </button>
                </div>
                <p>
                  <button onClick={() => handleRemove(storedListings.id)}>
                    Remove Item
                  </button>
                </p>
              </div>
            ))}
          </>
        ) : (
          <p className="empty-cart">Your cart is empty!</p>
        )}
        {storedListings.length > 0 ? (
          <>
          <p>Please log in or sign up in order to check out!</p>
          </>
        ) : (null)}
      </div>
    );
  }


// Return form for Users that are logged in
return (
  <div className="cart-container">
    <h1>Your Cart</h1>
    {orderListings.length > 0 ? (
      <>
        {orders.map((order) => (
          <div className="listing-item" key={order.id}>
            {orderListings.map((orderListing) => (
              <div key={orderListing.id}>
                {orderListing.listing ? (
                    <>
                      <p className="listing-name">Listing: {orderListing.listing.name}</p>
                      <p className="listing-price">
                        Price: {orderListing.listing.price}(
                        {orderListing.quantity}) = $
                        {orderListing.listing.price * orderListing.quantity}
                      </p>
                      <div className="listing-quantity">
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
                      </div>
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
            ))}
            <h2>
              Your total is $
              {orderListings.reduce(
                (total, orderListing) =>
                  total + orderListing.listing.price * orderListing.quantity,
                0
              )}
            </h2>
          </div>
        ))}
        <Link to={`/checkout/${userId}`}>
          <button className="checkout-button" type="button">
            Checkout
          </button>
        </Link>
      </>
    ) : (
      <p className="empty-cart">Your cart is empty!</p>
    )}
  </div>
);
};

export default Cart;