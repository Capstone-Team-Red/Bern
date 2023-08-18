import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleListing, selectSingleListing, updateListing } from '../../store/singleListingSlice';
import { useNavigate, useParams } from "react-router-dom";

const EditListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listing = useSelector((selectSingleListing));
  const { id } = useParams();
  const userId = useSelector((state) => state.auth.me.id);
  const [updatedListing, setUpdateListing] = useState({ ...listing });

  useEffect(() => {
    dispatch(getSingleListing(id));
  }, [dispatch, id]);

  const handleEditListing = async () => {
    try {
      const token = localStorage.getItem('token');
      await dispatch(updateListing({ token, id, listingData: updatedListing }));
      navigate(`/listings/${userId}/renterListings`)
      window.location.reload();
    } catch (error) {
      console.error('Failed to update listing:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateListing((prevListing) => ({ ...prevListing, [name]: value }));
  };

  return (
    <>
      <div className='edit-listing-container'>
        <h1 className='edit-listing-title'>Edit Listing Details</h1>
        <div key={listing.id}>
          <div className='edit-listing-container'>
          <label htmlFor='name'>Title: </label>
              <input type="text" name="name"                     placeholder="Title for your listing" value={updatedListing.name} onChange={handleInputChange} style={{ width: "200px" }} />
              <label htmlFor='classtype'>Class Type: </label>
              <input type="text" name="classtype" placeholder="i.e. Yoga, Boxing, Open Gym, etc..." value={updatedListing.classtype} onChange={handleInputChange} style={{ width: "200px" }} />
              <label htmlFor='address'>Address: </label>
              <input type="text" name="address" value={updatedListing.address} onChange={handleInputChange} style={{ width: "200px" }} />
              <label htmlFor='city'>City: </label>
              <input type="text" name="city" value={updatedListing.city} onChange={handleInputChange} style={{ width: "200px" }} />
              <label htmlFor='state'>State: </label>
              <input type="text" name="state" value={updatedListing.state} onChange={handleInputChange} style={{ width: "200px" }} />
              <label htmlFor='zipcode'>Zipcode: </label>
              <input type="text" name="zipcode" value={updatedListing.zipcode} onChange={handleInputChange} style={{ width: "200px" }} />
              <label htmlFor='date'>Date: </label>
              <input type="date" name="date" value={updatedListing.date} onChange={handleInputChange} style={{ width: "200px" }} />       
              <label htmlFor='time'>Time: </label>
              <input type="time" name="time" value={updatedListing.time} onChange={handleInputChange} style={{ width: "200px" }} />
              <label htmlFor='price'>Price: </label>
              <input type="number" min="0" name="price" value={updatedListing.price} onChange={handleInputChange} style={{ width: "200px" }} />
              <label htmlFor='stock'>Spots Available: </label>
            <input type="number" min="1" name="stock" placeholder="Max amount of attendees" value={updatedListing.stock} onChange={handleInputChange} style={{ width: "200px" }} />
            <br></br>
            <button onClick={handleEditListing}>Save</button>
            <br></br>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditListing;