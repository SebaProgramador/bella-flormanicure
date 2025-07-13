import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem("adminLogueado") === "true";
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
