import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleRenter, updateRenter } from '../../store/renterSlice';

const CreateListing = () => {
  const dispatch = useDispatch();
  const renter = useSelector((state) => state.auth.me);
  const id = renter.id
  const [updatedRenter, setUpdatedRenter] = useState({ ...renter });

  useEffect(() => {
    dispatch(getSingleRenter(id));
  }, [dispatch, id]);

  const handleEditRenter = async () => {
    try {
      const token = localStorage.getItem('token');
      await dispatch(updateRenter({ token, id, renterData: updatedRenter }));
      window.location.reload();
    } catch (error) {
      console.error('Failed to update renter:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedRenter((prevRenter) => ({ ...prevRenter, [name]: value }));
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

export default CreateListing;