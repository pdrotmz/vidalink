import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const userEmail = localStorage.getItem("userEmail");

    if (userEmail && userEmail.endsWith("@vidalink.com.br")) {
        return children;
    } else {
        return <Navigate to="/unauthorized" replace />;
    }
}