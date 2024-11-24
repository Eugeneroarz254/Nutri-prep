import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const OpenRoutes = ({ children }) => {
  const authState = useSelector((state) => state.auth);
  const [shouldNavigate, setShouldNavigate] = useState(false);

  useEffect(() => {
    if (authState.isSuccess && !authState.isError) {
      // Start the timer for delayed navigation
      const timer = setTimeout(() => {
        setShouldNavigate(true);
      }, 10000); // 10 seconds delay

      // Cleanup timer on component unmount
      return () => clearTimeout(timer);
    }
  }, [authState]);

  if (authState.isLoading) {
    return null; // or a loading spinner
  }

  if (shouldNavigate) {
    return <Navigate to="/" replace={true} />;
  }

  return children;
};
