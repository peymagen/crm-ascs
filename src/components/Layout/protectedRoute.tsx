import React, { type ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/store";

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth) as {
    isAuthenticated: boolean;
    user: IUser;
  };

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
