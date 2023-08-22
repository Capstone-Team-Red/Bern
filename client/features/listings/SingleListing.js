import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleListing } from "../../store/singleListingSlice";
import { useParams } from "react-router-dom";
import { selectReviews, getAllReviews } from "../../store/allReviewsSlice";
import { addToCart } from "../../store/orderListingsSlice";
import { useNavigate } from "react-router-dom";
import { incrementListing } from '../../store/orderListingsSlice';

const SingleListing = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.me.id);
  const orders = useSelector((state) => state.orders.orders);
  const reviews = useSelector(selectReviews);
  const { id } = useParams();
  const filteredReviews = reviews.filter((review) => 
    review.reviewed_entity_id == id
  );

  useEffect(() => {
    if (id) {
      dispatch(getSingleListing(id));
    }
  }, [dispatch, id]);

  // USE EFFECT FOR ALL REVIEWS
  useEffect(() => {
    dispatch(getAllReviews());
  }, [dispatch]);

  const orderListings = useSelector((state) => state.orderListings.orderListings);
  const listing = useSelector((state) => state.singleListing.singleListing);
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);

  const handleAddToCart = (listingId, listingPrice) => {
    if (userId && orders.length > 0) {
      const orderId = orders[0].id;
      const existingCartItem = orderListings.find(orderListing => orderListing.orderId === orderId && orderListing.listingId === listingId);
  
      if (existingCartItem) {
        // Item is already in the cart, increase its quantity
        dispatch(incrementListing(existingCartItem.id));
      } else {
        // Item is not in the cart, add it as a new item
        dispatch(addToCart({
          userId,
          listingId,
          price: listingPrice,
          orderId,
          quantity: 1,
        }));
      }
    }
  };

  const [reviewRating, setReviewRating] = useState(5); 
  const [reviewText, setReviewText] = useState("");

  const navigate = useNavigate();

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    navigate(`/listings/${id}`)
    window.location.reload();
    const newReview = {
      rating: reviewRating,
      review_text: reviewText,
      listingId: listing.id,
      reviewer_user_id:userId, 
      reviewed_entity_id:listing.id
    };
  
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });
  
      if (response.ok) {
        dispatch(getSingleListing(id));

        // Clear the review form after submission
        setReviewRating(5);
        setReviewText("");
      } else {
        // Handle error cases
        console.error('Failed to add review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };  

  const formatDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    return formattedDate;
  };

  return (
    <>
      <div className="listing-details-container">
        {listing && isLoggedIn ? (
            <div className="single-listing-container">
              <h3>{listing.name}</h3>
              <img src={listing.image} alt={listing.name} />
              <p>
                <span className="single-listing-details">Class Type: </span>
                {listing.classtype}
              </p>
              <p>
                <span className="single-listing-details">Address: </span>
                {listing.address}, {listing.city}, {listing.state},{" "}
                {listing.zipcode}
              </p>
              <p>
                <span className="single-listing-details">Date & Time: </span>
                {formatDate(listing.date)} @ {listing.time}
              </p>
              <p>
                <span className="single-listing-details">Spots Available: </span>
                {listing.stock}
              </p>
              <p>
                <span className="single-listing-details">Price: </span>$
                {listing.price}
              </p>
              <p>
                <button
                  className="add-to-cart-button"
                  onClick={() => handleAddToCart(listing.id, listing.price)}
                >
                  Book a Class
                </button>
              </p>
            </div>
            ) : ( listing &&
          <div className="single-listing-container">
              <h3>{listing.name}</h3>
              <img src={listing.image} alt={listing.name} />
              <p>
                <span className="single-listing-details">Class Type: </span>
                {listing.classtype}
              </p>
              <p>
                <span className="single-listing-details">Address: </span>
                {listing.address}, {listing.city}, {listing.state},{" "}
                {listing.zipcode}
              </p>
              <p>
                <span className="single-listing-details">Date & Time: </span>
                {formatDate(listing.date)} @ {listing.time}
              </p>
              <p>
                <span className="single-listing-details">Spots Available: </span>
                {listing.stock}
              </p>
              <p>
                <span className="single-listing-details">Price: </span>$
                {listing.price}
              </p>
            </div>
        )}
        {isLoggedIn ? (
          <div>
            <div className="reviews-list">
              <h4>Reviews</h4>
              {filteredReviews && filteredReviews.length > 0 ? (
                filteredReviews.map((review) => (
                  <div key={review.id} className="reviews-ratings-comments">
                    <p>{review.rating}/5</p>
                    <p>• {review.review_text}</p>
                  </div>
                ))
              ) : (
                <p>No reviews available.</p>
              )}
            </div>
            <div className="review-form">
              <form onSubmit={handleReviewSubmit}>
              <h4>Add a Review</h4>
                <div className="review-form-group">
                  <label htmlFor="reviewRating">Rating:</label>
                  <select
                    id="reviewRating"
                    name="reviewRating"
                    value={reviewRating}
                    onChange={(e) => setReviewRating(parseInt(e.target.value))}
                  >
                    
                    <option value="5">5 - Excellent</option>
                    <option value="4">4 - Very Good</option>
                    <option value="3">3 - Good</option>
                    <option value="2">2 - Fair</option>
                    <option value="1">1 - Poor</option>
                  </select>
                </div>
                <div className="review-form-group">
                  <label htmlFor="reviewText">Review:</label>
                  <textarea
                    id="reviewText"
                    name="reviewText"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows="4"
                  ></textarea>
                </div>
                <button type="submit">Submit Review</button>
              </form>
            </div>
          </div>
        ) : (
          <div className="reviews-list">
            <h4>Reviews</h4>
            {filteredReviews && filteredReviews.length > 0 ? (
              filteredReviews.map((review) => (
                <div key={review.id} className="reviews-ratings-comments">
                <p>{review.rating}/5</p>
                <p>• {review.review_text}</p>
              </div>
              ))
            ) : (
              <p>No reviews available.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SingleListing;
