import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleListing } from "../../store/singleListingSlice";
import { useParams } from "react-router-dom";
import { addToCart } from "../../store/orderListingsSlice";

const SingleListing = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.me.id);
  const orders = useSelector((state) => state.orders.orders);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getSingleListing(id));
    }
  }, [dispatch, id]);

  const listing = useSelector((state) => state.singleListing.singleListing);

  const handleAddToCart = (listingId, listingPrice) => {
    if (userId && orders.length > 0) {
      const orderId = orders[0].id;
      dispatch(
        addToCart({
          userId,
          listingId,
          price: listingPrice,
          orderId,
          quantity: 1,
        })
      );
    } else {
      const storedListings = JSON.parse(localStorage.getItem("listings")) || [];
      const existingListing = storedListings.find((l) => l.id === listingId);

      if (existingListing) {
        existingListing.quantity++;
      } else {
        storedListings.push({
          id: listingId,
          name: listing.name,
          price: listingPrice,
          quantity: 1,
        });
      }

      localStorage.setItem("listings", JSON.stringify(storedListings));
    }
  };

  return (
    <div className="listing-details">
      {listing ? (
        <>
          <div>
            <h2>Listing Details</h2>
            <p>Name: {listing.name}</p>
            <img src={`${listing.image}`} className="listing-img" />
            <p>Description: {listing.description}</p>
            <p>Price: ${listing.price}</p>

            <p>
              <button
                className="add-to-cart-button"
                onClick={() => handleAddToCart(listing.id, listing.price)}
              >
                Add to Cart
              </button>
            </p>
          </div>
        </>
      ) : (
        <p className="loading-text">Loading listing...</p>
      )}
    </div>
  );
};

export default SingleListing;
