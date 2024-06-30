import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useStore from '../../app/store';

const PrivateRoute = () => {
    const { isLoggedIn } = useStore();

  return isLoggedIn() ? (
    <div>
      {/* Header và nội dung khác cho layout */}
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
