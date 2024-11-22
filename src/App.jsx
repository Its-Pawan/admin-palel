import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import Notfound from "views/Notfound";

import { logoutUser } from "features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

import { notifyInfo } from "components/utils/ToastNotifications";
import Loader from "components/loader/Loader";
import Cookies from "js-cookie";

const App = () => {
  const { isLoading, user, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  // console.log(isLoading, user, isAuthenticated);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    notifyInfo("Log-out Successfull");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    localStorage.removeItem("refreshToken");
  };
  const refreshToken = localStorage.getItem("refreshToken");

  // Define a clear condition for authentication
  const isUserAuthenticated =
    (refreshToken && Object.keys(user).length !== 0) || isAuthenticated;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {isUserAuthenticated ? (
        <Routes>
          <Route path="/" element={<Navigate to="/admin/blogs" replace />} />
          <Route
            path="admin/*"
            element={<AdminLayout logout={handleLogout} />}
          />
          <Route path="*" element={<Notfound />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<AuthLayout />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
      <div className=" fixed z-[99999999000999999999999999999999999]">
        <ToastContainer />
      </div>
    </>
  );
};

export default App;
