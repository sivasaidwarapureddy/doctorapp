// import React from "react";
// import { Navigate } from "react-router-dom";


// const ProtectedRoute = ({ children }) => {
//   if (!localStorage.getItem('token')) {
//     return <Navigate to="/login" />; // Redirect to login if not authenticated
//   }
//   return children; // Render the child component if authenticated
// };

// export default ProtectedRoute;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { setUser } from "../redux/features/userSlice";
// import setUser from "../redux/userSlice"; // Update the path to your slice

const getUserData = async (token) => {
  try {
    const response = await fetch('/api/user/getUserdata', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Failed to fetch user data');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user); // Access user state from Redux

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !user) { // Fetch user data if token exists and user is not set
      getUserData(token).then((data) => {
        if (data) {
          dispatch(setUser(data)); // Dispatch setUser action with fetched data
        }
      });
    }
  }, [dispatch, user]);

  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }
useEffect(() =>{
  if (!user) {
    getUserData() // Display loading until user data is fetched
  }
},[user])


  return children; // Render the child component if authenticated
};

export default ProtectedRoute;
