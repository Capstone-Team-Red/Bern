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

  const formatDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    return formattedDate;
  };

  return (
    <div className="listing-details-container">
      {listing ? (
        <>
          <div>
                <h3>{listing.name}</h3>
                <img src={listing.image} alt={listing.name} />
                <p><span className="single-listing-details">Class Type: </span>{listing.classtype}</p>
                <p><span className="single-listing-details">Address: </span>{listing.address}, {listing.city}, {listing.state}, {listing.zipcode}</p>
                <p><span className="single-listing-details">Date & Time: </span>{formatDate(listing.date)} @ {listing.time}</p>
                <p><span className="single-listing-details">Spots Available: </span>{listing.stock}</p>
                <p><span className="single-listing-details">Price: </span>${listing.price}</p>
                {listing.imageURLs && listing.imageURLs.length > 0 && (<p><span className="single-listing-details">Photo Gallery Of The Space:</span></p>)}
                <p className="single-listing-details">{listing.imageURLs?.map((imageSrc, index) => (
                <img key={index} src={imageSrc} alt={`Uploaded ${index}`} />))}
                </p>
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