import React, { useEffect, useCallback } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { setUser } from "../redux/features/userSlice";

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // ✅ useCallback to prevent infinite loop
  const getUser = useCallback(async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/user/getUserData`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        dispatch(setUser(res.data.data));
      } else {
        localStorage.clear();
      }
    } catch (error) {
      dispatch(hideLoading());
      localStorage.clear();
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);

  // ✅ Check token properly
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  return children;
}
