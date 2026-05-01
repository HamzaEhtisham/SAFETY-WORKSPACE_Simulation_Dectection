import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  console.log("AdminRoute - Token:", token);
  console.log("AdminRoute - User:", user);
  console.log("AdminRoute - User Role:", user ? user.role : "N/A");

  return token && user && user.role === 'admin' ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AdminRoute;
