import React from "react";
import { Navigate } from "react-router-dom";


const PublicRoute = ({ children }) => {
  if (localStorage.getItem('token')) {
    return <Navigate to="/" replace />; // Redirect to homepage if already authenticated
  }
  return children; // Render the child component if not authenticated
};

export default PublicRoute;

