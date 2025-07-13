// src/RutaProtegida.js
import { Navigate } from "react-router-dom";
import { estaAutenticadoAdmin } from "./auth";

export default function RutaProtegida({ children }) {
  return estaAutenticadoAdmin() ? children : <Navigate to="/login" />;
}
