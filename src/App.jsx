import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import Notfound from "views/Notfound";

import { logoutUser } from "features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

import { 
  notifyInfo,
} from "components/utils/ToastNotifications";
import Loader from "components/loader/Loader";
import Cookies from "js-cookie";

const App = () => {
  const { isLoading, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    notifyInfo("Log-out Successfull");
  };
  const refreshToken = Cookies.get("refreshToken");

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      {refreshToken || user ? (
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
