import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleRenter, updateRenter } from '../../store/renterSlice';

const EditRenter = () => {
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
    <>
        <div>
          <h1>Edit Renter Profile Details</h1>
          <div key={renter.id}>
              <div className='edit-renter-container'>
                <p className='edit-renter-text'>Firstname: 
                  <input type="text" name="firstname" value={updatedRenter.firstname} onChange={handleInputChange} style={{ width: "200px" }} />
                </p>
                <p className='edit-renter-text'>Lastname: 
                  <input type="text" name="lastname" value={updatedRenter.lastname} onChange={handleInputChange} style={{ width: "200px" }} />
                </p>
                <p className='edit-renter-text'>Email: 
                  <input type="email" name="email" value={updatedRenter.email} onChange={handleInputChange} style={{ width: "200px" }} />
                </p>
                <p className='edit-renter-text'>Zipcode: 
                  <input type="text" name="zipcode" value={updatedRenter.zipcode} onChange={handleInputChange} style={{ width: "200px" }} />       
                </p>
                <button onClick={handleEditRenter}>Save</button>
              </div>
          </div>
        </div>
    </>
  );
};

export default EditRenter;