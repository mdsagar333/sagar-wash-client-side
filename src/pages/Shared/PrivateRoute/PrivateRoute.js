import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import Loading from "../Loading";

const PrivateRoute = ({ children, ...rest }) => {
  const location = useLocation();
  const { isUserLoading, user } = useSelector((state) => state.globalState);

  if (!user) {
    return <Navigate to="/login" state={{ from: location }}></Navigate>;
  }

  return children;
};

export default PrivateRoute;
