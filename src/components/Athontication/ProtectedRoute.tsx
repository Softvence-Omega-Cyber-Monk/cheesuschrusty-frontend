import { Navigate } from "react-router-dom";
import React from "react";

type UserRole = "user" | "freeuser" | "admin";

type UserData = {
  role: UserRole;
  email?: string;
};

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles: UserRole[];
};

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const userData = localStorage.getItem("userData");

  if (!userData) return <Navigate to="/login" />;

  let user: UserData;
  try {
    user = JSON.parse(userData);
  } catch {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) return <Navigate to="/login" />;

  return <>{children}</>;
};

export default ProtectedRoute;
