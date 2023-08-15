import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleListing, selectSingleListing, updateListing } from '../../store/singleListingSlice';
import { useNavigate, useParams } from "react-router-dom";
import UploadImages from './UploadImages';
import axios from 'axios';

const EditRenter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listing = useSelector(selectSingleListing);
  const { id } = useParams();
  const userId = useSelector((state) => state.auth.me.id);
  const [updatedListing, setUpdateListing] = useState({ ...listing });
  const [imageURLs, setImageURLs] = useState([]);
  const [mapsSecret, setMapsSecret] = useState(null);

  useEffect(() => {
    dispatch(getSingleListing(id));
  }, [dispatch, id]);

  useEffect(() => {
    const fetchMapsSecret = async () => {
        try {
            const response = await fetch("/get-maps-secret");
            const data = await response.json();
            setMapsSecret(data.mapsSecret);
        } catch (error) {
            console.error("Error fetching maps secret:", error);
        }
    };

    fetchMapsSecret();
}, []);

  useEffect(() => {
    dispatch(getSingleListing(id));
  }, [dispatch, id]);

  const handleEditListing = async () => {
    try {
      const token = localStorage.getItem('token');
      if (
        updatedListing.address !== listing.address ||
        updatedListing.city !== listing.city ||
        updatedListing.state !== listing.state ||
        updatedListing.zipcode !== listing.zipcode
    ) {
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: `${updatedListing.address}, ${updatedListing.city}, ${updatedListing.state} ${updatedListing.zipcode}`,
                key: mapsSecret
            },
        });

        const { results } = response.data;
        if (results && results.length > 0) {
            const { lat, lng } = results[0].geometry.location;
            const listingDataWithImageURLs = {
                ...updatedListing,
                imageURLs: imageURLs,
                lat: lat,
                lng: lng,
            };

            await dispatch(updateListing({ token, id, listingData: listingDataWithImageURLs }));
            navigate(`/listings/${userId}/renterListings`)
            window.location.reload();
        }
    } else {
        const listingDataWithImageURLs = {
            ...updatedListing,
            imageURLs: imageURLs,
        };

        await dispatch(updateListing({ token, id, listingData: listingDataWithImageURLs }));
        navigate(`/listings/${userId}/renterListings`)
        window.location.reload();
    }
    } catch (error) {
      console.error('Failed to update listing:', error);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateListing((prevListing) => ({ ...prevListing, [name]: value }));
    
  };

  const handleImageUpload = (imageURLs) => {
    setImageURLs(imageURLs);
  };

  return (
    <>
        <div>
          <h1>Edit Listing Details</h1>
          <div key={listing.id}>
              <div className='edit-listing-container'>
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
                <p className='edit-listing-text'>Zip Code: 
                  <input type="text" name="zipcode" value={updatedListing.zipcode} onChange={handleInputChange} style={{ width: "200px" }} />
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
                <p className='edit-listing-text'>Photo Gallery Of The Space:
                <UploadImages onImageUpload={handleImageUpload} />
                </p>
                <button onClick={handleEditListing}>Save</button>
              </div>
          </div>
        </div>
    </>
  );
};

export default EditRenter;