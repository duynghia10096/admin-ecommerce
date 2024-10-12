import React, {  Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation  } from "react-router-dom";
import {AUTH_DETAILS_COOKIE} from "../../constants/authConstant"
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  // Retrieve user data from cookies
  const userCookie = Cookies.get(AUTH_DETAILS_COOKIE);
 
  // Parse the cookie data to JSON (assuming it's stored as JSON string)
  const user = userCookie ? JSON.parse(userCookie) : null;
  
  const location = useLocation();

  // Check if user exists and is authenticated
  if (!user || !user.roles.some(role => role.name === "ROLE_ADMIN")) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;