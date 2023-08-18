import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleListing } from "../../store/singleListingSlice";
import { useParams } from "react-router-dom";
import { selectReviews, getAllReviews } from "../../store/allReviewsSlice";
import { addToCart } from "../../store/orderListingsSlice";
import { useNavigate } from "react-router-dom";

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

  // USE EFFECT FOR ALL REViews
  useEffect(() => {
    dispatch(getAllReviews());
  }, [dispatch]);

  const listing = useSelector((state) => state.singleListing.singleListing);
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);

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

  const [reviewRating, setReviewRating] = useState(5); 
  const [reviewText, setReviewText] = useState("");
  const [submittedReview, setSubmittedReview] = useState(false);

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
        setSubmittedReview(true);
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
                <div className="single-listing-details">Class Type: </div>
                {listing.classtype}
              </p>
              <p>
                <div className="single-listing-details">Address: </div>
                {listing.address}, {listing.city}, {listing.state},{" "}
                {listing.zipcode}
              </p>
              <p>
                <div className="single-listing-details">Date & Time: </div>
                {formatDate(listing.date)} @ {listing.time}
              </p>
              <p>
                <div className="single-listing-details">Spots Available: </div>
                {listing.stock}
              </p>
              <p>
                <div className="single-listing-details">Price: </div>$
                {listing.price}
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
            ) : ( listing &&
          <div>
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
<div className="reviews-list">
              <h4>Reviews</h4>
              {filteredReviews && filteredReviews.length > 0 ? (
                filteredReviews.map((review) => (
                  <div key={review.id}>
                    <p>Rating: {review.rating}</p>
                    <p>Review: {review.review_text}</p>
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
    </>
  );
};

export default SingleListing;
