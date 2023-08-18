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
          <div>
            <p className='edit-listing-text'>Name: 
              <input type="text" name="name" value={updatedListing.name} onChange={handleInputChange} style={{ width: "200px" }} />
            </p>
            <p className='edit-listing-text'>Class Type: 
              <input type="text" name="classtype" value={updatedListing.classtype} onChange={handleInputChange} style={{ width: "200px" }} />
            </p>
            <p className='edit-listing-text'>Address: 
              <input type="text" name="address" value={updatedListing.address} onChange={handleInputChange} style={{ width: "200px" }} />
            </p>
            <p className='edit-listing-text'>City: 
              <input type="text" name="city" value={updatedListing.city} onChange={handleInputChange} style={{ width: "200px" }} />
            </p>
            <p className='edit-listing-text'>State: 
              <input type="text" name="state" value={updatedListing.state} onChange={handleInputChange} style={{ width: "200px" }} />
            </p>
            <p className='edit-listing-text'>Date: 
              <input type="date" name="date" value={updatedListing.date} onChange={handleInputChange} style={{ width: "200px" }} />       
            </p>
            <p className='edit-listing-text'>Time: 
              <input type="time" name="time" value={updatedListing.time} onChange={handleInputChange} style={{ width: "200px" }} />
            </p>
            <p className='edit-listing-text'>Price: 
              <input type="number" name="price" value={updatedListing.price} onChange={handleInputChange} style={{ width: "200px" }} />
            </p>
            <p className='edit-listing-text'>Spots Available: 
              <input type="number" name="stock" value={updatedListing.stock} onChange={handleInputChange} style={{ width: "200px" }} />
            </p>
            <button onClick={handleEditListing}>Save</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditListing;