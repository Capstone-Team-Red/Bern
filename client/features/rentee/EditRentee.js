import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser, updateUser } from "../../store/userSlice";

const EditRentee = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.me);
  const id = user.id;
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  useEffect(() => {
    dispatch(getSingleUser(id));
  }, [dispatch, id]);

  const handleEditUser = async () => {
    try {
      const token = localStorage.getItem("token");
      await dispatch(updateUser({ token, id, userData: updatedUser }));
      window.location.reload();
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <>
      <div className="edit-user-container">
        <h1>Edit User Profile Details</h1>
        <div key={user.id}>
          <div>
            <p className="edit-user-text">
              Firstname:
              <input
                type="text"
                name="firstname"
                value={updatedUser.firstname}
                onChange={handleInputChange}
                style={{ width: "200px" }}
              />
            </p>
            <p className="edit-user-text">
              Lastname:
              <input
                type="text"
                name="lastname"
                value={updatedUser.lastname}
                onChange={handleInputChange}
                style={{ width: "200px" }}
              />
            </p>
            <p className="edit-user-text">
              Email:
              <input
                type="email"
                name="email"
                value={updatedUser.email}
                onChange={handleInputChange}
                style={{ width: "200px" }}
              />
            </p>
            <p className="edit-user-text">
              Zipcode:
              <input
                type="text"
                name="zipcode"
                value={updatedUser.zipcode}
                onChange={handleInputChange}
                style={{ width: "200px" }}
              />
            </p>
            <button onClick={handleEditUser}>Save</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditRentee;
