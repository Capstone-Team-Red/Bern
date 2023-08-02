import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../../store/store";

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    const role = evt.target.role.value;

    if (formName === "login") {
      dispatch(authenticate({ username, password, role, method: formName }));
    } else if (formName === "signup") {
      const email = evt.target.email.value;
      const firstName = evt.target.firstname.value;
      const lastName = evt.target.lastname.value;
      const zipcode = evt.target.zipcode.value;

      dispatch(
        authenticate({
          username,
          password,
          firstName,
          lastName,
          email,
          role,
          zipcode,
          method: formName,
        })
      );
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
            <input name="role" type="text" />
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
            <input name="role" type="text" />
          </div>
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </div>
          <div>
            <label htmlFor="firstName">
              <small>First Name</small>
            </label>
            <input name="firstName" type="text" />
          </div>
          <div>
            <label htmlFor="lastName">
              <small>Last Name</small>
            </label>
            <input name="lastName" type="text" />
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
