import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function Historial() {
  const navigate = useNavigate();
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    cargarHistorial();
  }, []);

  const cargarHistorial = async () => {
    try {
      const snapshot = await getDocs(collection(db, "historialConfirmados"));
      const datos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHistorial(datos);
    } catch (error) {
      console.error("❌ Error al cargar historial:", error);
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Eliminar esta reserva del historial?")) {
      try {
        await deleteDoc(doc(db, "historialConfirmados", id));
        setHistorial(historial.filter((r) => r.id !== id));
      } catch (error) {
        console.error("❌ Error al eliminar reserva:", error);
      }
    }
  };

  return (
    <div
      style={{
        padding: 30,
        maxWidth: 950,
        margin: "30px auto",
        backgroundColor: "#fff3e0",
        borderRadius: "20px",
        fontFamily: "'Segoe UI', sans-serif",
        boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#bf360c",
          fontSize: "2.2rem",
          marginBottom: 10,
          fontWeight: "bold",
        }}
      >
        📖 Historial de Reservas Confirmadas
      </h1>

      <p style={{ textAlign: "center", fontSize: "18px", color: "#5d4037" }}>
        Total de clientas confirmadas: <strong>{historial.length}</strong>
      </p>

      {historial.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "18px", color: "#bf360c" }}>
          No hay reservas confirmadas.
        </p>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginTop: 20,
          }}
        >
          {historial.map((r, i) => (
            <div
              key={r.id}
              style={{
                backgroundColor: "#ffffff",
                padding: "18px",
                borderRadius: "16px",
                borderLeft: "6px solid #ff7043",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              <p><strong>👩 Cliente #{i + 1}</strong></p>
              <p><strong>📛 Nombre:</strong> {r.nombre}</p>
              <p><strong>📧 Email:</strong> {r.email}</p>
              <p><strong>Teléfono:</strong> {r.telefono}</p>
              <p><strong>📍 Dirección:</strong> {r.direccion}</p>
              <p><strong>📅 Día:</strong> {r.dia} — <strong>🕒 Hora:</strong> {r.hora}</p>
              <p><strong>🎨 Colores:</strong> {r.colores}</p>
              <p><strong>💅 Técnica:</strong> {r.tecnica}</p>
              <p><strong>✨ Estilo:</strong> {r.estilo}</p>
              <p><strong>📆 Fecha confirmación:</strong> {r.fechaConfirmacion}</p>

              <div style={{ marginTop: 10, display: "flex", justifyContent: "flex-end" }}>
                <button
                  onClick={() => handleEliminar(r.id)}
                  style={{
                    backgroundColor: "#e53935",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "12px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                    transition: "transform 0.2s",
                  }}
                  onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                  onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                >
                  🗑 Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Botón volver al inicio */}
      <div style={{ textAlign: "center", marginTop: 30 }}>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "#ffccbc",
            color: "#bf360c",
            padding: "12px 24px",
            border: "none",
            borderRadius: "25px",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            transition: "transform 0.2s",
            marginBottom: 15,
          }}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          ⬅️ Volver al Inicio
        </button>

        {/* Botón para volver a admin */}
        <button
          onClick={() => navigate("/admin")}
          style={{
            background: "#e1bee7",
            color: "#6a1b9a",
            padding: "12px 24px",
            border: "none",
            borderRadius: "25px",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            transition: "transform 0.2s",
            marginLeft: 10,
          }}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          🔙 Volver al Panel de Administración
        </button>
      </div>
    </div>
  );
}
