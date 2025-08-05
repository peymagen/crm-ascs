import React, { type ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/store";

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  children,
}) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth) as {
    isAuthenticated: boolean;
    user: IUser;
  };

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  const userRoles: string = user?.role || "";

  const hasAccess = allowedRoles.includes(userRoles);

  if (!hasAccess) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
