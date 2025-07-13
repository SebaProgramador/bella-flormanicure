// src/App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import ProtectedRoute from "./components/ProtectedRoute";

import Inicio from "./pages/Inicio";
import Ficha from "./pages/Ficha";
import LoginAdmin from "./pages/LoginAdmin";
import AdminPanel from "./pages/AdminPanel";
import Historial from "./pages/Historial";
import Politicas from "./pages/Politicas";
import ListaReservas from "./pages/ListaReservas";

export default function App() {
  // 🔍 TEST de conexión a Firebase
  useEffect(() => {
    const probarFirebase = async () => {
      try {
        const snapshot = await getDocs(collection(db, "reservas"));
        console.log("✅ Firebase conectado. Reservas encontradas:", snapshot.size);
      } catch (error) {
        console.error("❌ Error al conectar con Firebase:", error);
      }
    };

    probarFirebase();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Públicas */}
        <Route path="/" element={<Inicio />} />
        <Route path="/ficha" element={<Ficha />} />
        <Route path="/login" element={<LoginAdmin />} />
        <Route path="/politicas" element={<Politicas />} />
        <Route path="/lista-reservas" element={<ListaReservas />} />

        {/* Protegidas solo para admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/historial"
          element={
            <ProtectedRoute>
              <Historial />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
