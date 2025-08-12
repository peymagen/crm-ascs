import React, { type ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/store";

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  console.log('ProtectedRoute:', { isAuthenticated, user, allowedRoles });

  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to login');
    return <Navigate to="/admin/login" />;
  }

  // For development, temporarily allow all authenticated users
  return children;
};

export default ProtectedRoute;
