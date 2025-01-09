import React from 'react';
import { Navigate } from 'react-router-dom';

interface AdminRouteProps {
  isAdmin: boolean;
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ isAdmin, children }) => {
  return isAdmin ? <>{children}</> : <Navigate to="/dashboard" />;
};

export default AdminRoute; 