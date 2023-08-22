import React, { useEffect } from 'react';
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
  const orderListings = useSelector((state) => state.orderListings.orderListings);

  useEffect(() => {
    dispatch(me());
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(getIncompleteOrders(userId));
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
  };

  const handleDecrement = (orderListingId) => {
    dispatch(decrementListing(orderListingId));
  };

  const handleRemove = (orderListingId) => {
    dispatch(removeFromCart(orderListingId));
  };

// Return form for Users that are logged in
return (
  <div className="cart-container">
    <h1 id='cart-title'></h1>
      <img src="/images/your-cart.png" alt="yourcart" id='cart-title' />
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
                        Reservations: {orderListing.quantity}{" "}
                        <button max="1" 
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