import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticateRenterLogin, authenticateLogin, authenticateRenterSignUp, authenticateSignUp } from "../../store/store"; 

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    const role = evt.target.role.value;

    if (formName === "login") {
      if (role === 'User') {
        dispatch(authenticateLogin({ username, password, role, method: formName }));
      } else if (role === 'Renter') {
        dispatch(authenticateRenterLogin({ username, password, role, method: formName }));
      } else {
        console.error('Invalid role selected: ', role);
      }
    } else if (formName === "signup") {
      const email = evt.target.email.value;
      const firstname = evt.target.firstname.value;
      const lastname = evt.target.lastname.value;
      const zipcode = evt.target.zipcode.value;

      if (!zipcode || !lastname) {
        console.error('Error with signup. Please double check your information.');
        return;
    }
    if (zipcode.length !== 5) {
      console.error('Zipcode must have exactly 5 digits.');
      return;
    }

      if (role === 'User') {
        dispatch( authenticateSignUp({ username, password, firstname, lastname, email, role, zipcode, method: formName }));
      } else if (role === 'Renter') {
        dispatch(authenticateRenterSignUp({ username, password, firstname, lastname, email, role, zipcode, method: formName }));
      } else {
        console.error('Invalid role selected: ', role)
      }
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
            <select name="role">
              <option value="User">User 🏋️‍♂️</option>
              <option value="Renter">Renter 👨‍💼👩‍💼</option>
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
          {error ? (
            <div>Error with Login. Please double check your role.</div>
          ) : null}
        </form>
      )}
      {name === "signup" && (
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="role">
              <small>Role</small>
            </label>
            <select name="role">
              <option value="User">User 🏋️‍♂️</option>
              <option value="Renter">Renter 👨‍💼👩‍💼</option>
            </select>
          </div>
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="email" />
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
            <input name="zipcode" type="text"/>
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