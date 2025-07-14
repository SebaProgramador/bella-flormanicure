import React, { useEffect, useState } from "react";
import { cerrarSesionAdmin } from "../auth";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";

export default function AdminPanel() {
  const [reservas, setReservas] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [mostrarHistorial, setMostrarHistorial] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    cargarReservas();
    cargarHistorial();
  }, []);

  const cargarReservas = async () => {
    try {
      const snapshot = await getDocs(collection(db, "reservas"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReservas(data);
    } catch (error) {
      console.error("Error al cargar reservas:", error);
    }
  };

  const cargarHistorial = async () => {
    try {
      const snapshot = await getDocs(collection(db, "historialConfirmados"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHistorial(data);
    } catch (error) {
      console.error("Error al cargar historial:", error);
    }
  };

  const confirmarReserva = async (reserva) => {
    try {
      const reservaConfirmada = {
        ...reserva,
        fechaConfirmacion: new Date().toLocaleString(),
      };
      await addDoc(collection(db, "historialConfirmados"), reservaConfirmada);
      await deleteDoc(doc(db, "reservas", reserva.id));
      setReservas(reservas.filter((r) => r.id !== reserva.id));
      setHistorial((prev) => [...prev, reservaConfirmada]);
    } catch (error) {
      console.error("❌ Error al confirmar:", error);
      alert("Error al confirmar reserva.");
    }
  };

  const eliminarReserva = async (id) => {
    if (window.confirm("¿Eliminar esta reserva?")) {
      try {
        await deleteDoc(doc(db, "reservas", id));
        setReservas(reservas.filter((r) => r.id !== id));
      } catch (error) {
        console.error("❌ Error al eliminar:", error);
      }
    }
  };

  const eliminarHistorial = async (id) => {
    if (window.confirm("¿Eliminar del historial?")) {
      try {
        await deleteDoc(doc(db, "historialConfirmados", id));
        setHistorial(historial.filter((h) => h.id !== id));
      } catch (error) {
        console.error("❌ Error al eliminar del historial:", error);
      }
    }
  };

  return (
    <div
      style={{
        padding: 30,
        maxWidth: 1000,
        margin: "30px auto",
        backgroundColor: "#ffffff",
        borderRadius: "20px",
        fontFamily: "'Segoe UI', sans-serif",
        boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#2e7d32",
          fontSize: "2.6rem",
          marginBottom: 10,
          fontWeight: "bold",
        }}
      >
        📋 Panel de Administración
      </h1>

      <p
        style={{
          textAlign: "center",
          fontSize: "18px",
          color: "#4e4e4e",
          fontWeight: "600",
        }}
      >
        Total de reservas activas:{" "}
        <strong style={{ color: "#2e7d32" }}>{reservas.length}</strong>
      </p>

      {/* BOTONES DE NAVEGACIÓN */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          margin: "20px 0",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => navigate("/")}
          style={botonEstilo("#a5d6a7", "#2e7d32")}
        >
          🏠 Volver al Inicio
        </button>
        <button
          onClick={() => navigate("/ficha")}
          style={botonEstilo("#a5d6a7", "#2e7d32")}
        >
          📝 Ir a Ficha
        </button>
        <button
          onClick={() => setMostrarHistorial(!mostrarHistorial)}
          style={botonEstilo("#a5d6a7", "#2e7d32")}
        >
          {mostrarHistorial ? "🔒 Ocultar Historial" : "📖 Ver Historial"}
        </button>
        <button
          onClick={() => {
            cerrarSesionAdmin();
            navigate("/login");
          }}
          sstyle={botonEstilo("#ffffff", "#2e7d32")}
        >
          🚪 Cerrar sesión
        </button>
      </div>

      {/* LISTA DE RESERVAS */}
      <div style={{ marginTop: 30 }}>
        {reservas.map((r, i) => (
          <div key={r.id} style={cardEstilo()}>
            <p><strong>👩 Cliente #{i + 1}</strong></p>
            <p><strong>📛 Nombre:</strong> {r.nombre}</p>
            <p><strong>📧 Email:</strong> {r.email}</p>
            <p><strong>📍 Dirección:</strong> {r.direccion}</p>
            <p><strong>📅 Día:</strong> {r.dia} — <strong>🕒 Hora:</strong> {r.hora}</p>
            <p><strong>🎨 Colores:</strong> {r.colores}</p>
            <p><strong>💅 Técnica:</strong> {r.tecnica}</p>
            <p><strong>✨ Estilo:</strong> {r.estilo}</p>

            <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button
                onClick={() => confirmarReserva(r)}
                style={botonEstilo("#a5d6a7", "#2e7d32")}
              >
                💰 Pagado
              </button>
              <button
                onClick={() => eliminarReserva(r.id)}
                style={botonEstilo("#ef9a9a", "#b71c1c")}
              >
                🗑 Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* HISTORIAL DE RESERVAS CONFIRMADAS */}
      {mostrarHistorial && (
        <div style={{ marginTop: 50 }}>
          <h2 style={{ textAlign: "center", color: "#2e7d32" }}>
            📖 Historial de Reservas Confirmadas
          </h2>

          <p style={{ textAlign: "center", color: "#555", fontWeight: "bold" }}>
            Total confirmadas:{" "}
            <strong style={{ color: "#2e7d32" }}>{historial.length}</strong>
          </p>

          {historial.length === 0 ? (
            <p style={{ textAlign: "center", color: "#888" }}>
              No hay reservas en historial.
            </p>
          ) : (
            historial.map((r, i) => (
              <div key={r.id} style={cardEstilo("#ffffff")}>
                <p><strong>✅ Cliente #{i + 1}</strong></p>
                <p><strong>📛 Nombre:</strong> {r.nombre}</p>
                <p><strong>📧 Email:</strong> {r.email}</p>
                <p><strong>📍 Dirección:</strong> {r.direccion}</p>
                <p><strong>📅 Día:</strong> {r.dia} — <strong>🕒 Hora:</strong> {r.hora}</p>
                <p><strong>🎨 Colores:</strong> {r.colores}</p>
                <p><strong>💅 Técnica:</strong> {r.tecnica}</p>
                <p><strong>✨ Estilo:</strong> {r.estilo}</p>
                <p><strong>📆 Confirmado:</strong> {r.fechaConfirmacion}</p>

                <div style={{ marginTop: 10 }}>
                  <button
                    onClick={() => eliminarHistorial(r.id)}
                    style={botonEstilo("#f8bbd0", "#880e4f")}
                  >
                    🗑 Eliminar del Historial
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

// 💚 BOTÓN ESTILO VERDE AGUA
const botonEstilo = (bg, color) => ({
  backgroundColor: bg,
  color: color,
  padding: "10px 20px",
  border: "none",
  borderRadius: "25px",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
  transition: "transform 0.2s",
  fontSize: "15px",
  minWidth: "130px",
});

// 💚 TARJETAS CON DETALLES DE RESERVA
const cardEstilo = () => ({
  backgroundColor: "#ffffff",
  padding: "18px",
  borderRadius: "16px",
  borderLeft: "6px solid #2e7d32",
  marginBottom: "20px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
});
