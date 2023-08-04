import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleRentee, updateRentee } from "../../store/userSlice";

const EditRentee = () => {
  const dispatch = useDispatch();
  const rentee = useSelector((state) => state.auth.me);
  const id = rentee.id;
  const [updatedRentee, setUpdatedRentee] = useState({ ...rentee });

  useEffect(() => {
    dispatch(getSingleRentee(id));
  }, [dispatch, id]);

  const handleEditRentee = async () => {
    try {
      const token = localStorage.getItem("token");
      await dispatch(updateRentee({ token, id, renteeData: updatedRentee }));
      window.location.reload();
    } catch (error) {
      console.error("Failed to update rentee:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedRentee((prevRentee) => ({ ...prevRentee, [name]: value }));
  };

  return (
    <>
      <div>
        <h1>Edit Rentee Profile Details</h1>
        <div key={rentee.id}>
          <div className="edit-rentee-container">
            <p className="edit-rentee-text">
              Firstname:
              <input
                type="text"
                name="firstname"
                value={updatedRentee.firstname}
                onChange={handleInputChange}
                style={{ width: "200px" }}
              />
            </p>
            <p className="edit-rentee-text">
              Lastname:
              <input
                type="text"
                name="lastname"
                value={updatedRentee.lastname}
                onChange={handleInputChange}
                style={{ width: "200px" }}
              />
            </p>
            <p className="edit-rentee-text">
              Email:
              <input
                type="email"
                name="email"
                value={updatedRentee.email}
                onChange={handleInputChange}
                style={{ width: "200px" }}
              />
            </p>
            <p className="edit-rentee-text">
              Zipcode:
              <input
                type="text"
                name="zipcode"
                value={updatedRentee.zipcode}
                onChange={handleInputChange}
                style={{ width: "200px" }}
              />
            </p>
            <button onClick={handleEditRentee}>Save</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditRentee;
