import React from "react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: React.ReactElement;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const token = localStorage.getItem("authToken");

  if (token) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
