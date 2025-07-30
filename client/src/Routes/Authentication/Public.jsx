import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function Public() {
  const { jwt } = useSelector((state) => state.auth);
  if (jwt) return <Navigate to="/profile" />;
  return (
    <>
      <Outlet />
    </>
  );
}
