import React from "react";
import decode from "jwt-decode";
import { Route, Redirect } from "react-router-dom";

const checkAuth = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (!token) {
    return false;
  }
  try {
    const { exp } = decode(token);
    if (exp < Date.now() / 1000) {
      return false;
    }
  } catch (e) {
    return false;
  }
  return true;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => (
  (
    <Route
      {...rest}
      render={props =>
        checkAuth() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  )
);

export default PrivateRoute;
