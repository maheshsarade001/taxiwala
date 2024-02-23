import React, { useEffect, useState } from "react";
import { redirect, Navigate, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"; // Import your Firebase authentication instance
import useAuthStore from "../store/auth";

const ProtectedRoute = ({ Component }) => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);
  return <Component />;
};

export default ProtectedRoute;
