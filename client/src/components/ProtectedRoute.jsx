import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, className }) => {
  const { isAuth } = useSelector((state) => state.ui);

  if (!isAuth) {
    return <Navigate to="/user/login" />;
  }
  return <div className={` ${className}`}>{children}</div>;
};

export default ProtectedRoute;
