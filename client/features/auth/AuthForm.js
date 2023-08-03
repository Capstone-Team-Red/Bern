import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticate, me } from "../../store/store"; 

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [selectedRole, setSelectedRole] = useState("User"); // New state for selected role

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    const role = selectedRole; // Use selectedRole from state

    if (formName === "login") {
      dispatch(authenticate({ username, password, method: formName }));
    } else if (formName === "signup") {
      const email = evt.target.email.value;
      const firstname = evt.target.firstname.value;
      const lastname = evt.target.lastname.value;
      const zipcode = evt.target.zipcode.value;

      dispatch(
        authenticate({
          username,
          password,
          firstname,
          lastname,
          email,
          role: selectedRole, // Pass the selected role to the authenticate thunk
          zipcode,
          method: formName,
        })
      );
      // Dispatch me() after a successful sign-up
      await dispatch(me());
    }
  };

  return (
    <div>
      {name === "login" && (
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="role">
              <small>Role</small>
            </label>
            <select name="role" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
              <option value="User">User</option>
              <option value="Renter">Renter</option>
            </select>
          </div>
          <div>
            <label htmlFor="username">
              <small>Username</small>
            </label>
            <input name="username" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <div>
            <button type="submit">{displayName}</button>
          </div>
          {error && <div> {error} </div>}
        </form>
      )}
{name === "signup" && (
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="role">
              <small>Role</small>
            </label>
            <select name="role" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
              <option value="User">User</option>
              <option value="Renter">Renter</option>
            </select>
          </div>
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </div>
          <div>
            <label htmlFor="firstname">
              <small>First Name</small>
            </label>
            <input name="firstname" type="text" />
          </div>
          <div>
            <label htmlFor="lastname">
              <small>Last Name</small>
            </label>
            <input name="lastname" type="text" />
          </div>
          <div>
            <label htmlFor="name">
              <small>Choose a username</small>
            </label>
            <input name="username" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Create a Secure Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <div>
            <label htmlFor="zipcode">
              <small>zipcode</small>
            </label>
            <input name="zipcode" />
          </div>
          <div>
            <button type="submit">{displayName}</button>
          </div>
          {error ? (
            <div>Error with signup. Please double check your information.</div>
          ) : null}
        </form>
      )}
    </div>
  );
};

export default AuthForm;