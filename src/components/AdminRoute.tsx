import React from "react";
import { Navigate } from "react-router-dom";
import { isAdmin } from "../utils/auth";

interface AdminRouteProps {
  children: React.ReactElement;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin()) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
