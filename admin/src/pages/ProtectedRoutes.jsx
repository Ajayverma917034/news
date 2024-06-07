// src/pages/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { lookInSession } from "../common/session";

const ProtectedRoute = ({ component: Component, isAdmin = false, ...rest }) => {
  const sessionData = JSON.parse(lookInSession("user"));
  const user = sessionData?.user;
  if (!user) {
    toast.error("Please Login to access this page");
    // User is not authenticated
    return <Navigate to="/sign-in" />;
  }

  if (isAdmin && user?.role !== "admin") {
    // User is authenticated but not an admin
    toast.error("You are not authorized to access this page");
    return <Navigate to="/" />;
  }

  // User is authenticated and has the required role
  return <Component {...rest} />;
};

export default ProtectedRoute;
