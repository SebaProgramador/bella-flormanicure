import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function ListaReservas() {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    async function fetchReservas() {
      try {
        const querySnapshot = await getDocs(collection(db, "reservas"));
        const lista = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReservas(lista);
      } catch (error) {
        console.error("Error obteniendo reservas de Firebase:", error);
      }
    }
    fetchReservas();
  }, []);

  return (
    <div style={{ maxWidth: 700, margin: "30px auto", padding: 20, fontFamily: "'Segoe UI', sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: 30, color: "#004d40" }}>📋 Lista de Reservas</h2>
      {reservas.length === 0 ? (
        <p style={{ textAlign: "center" }}>No hay reservas aún.</p>
      ) : (
        reservas.map((r) => (
          <div
            key={r.id}
            style={{
              border: "2px solid #004d40",
              borderRadius: 15,
              padding: 15,
              marginBottom: 15,
              backgroundColor: "#b2dfdb",
              boxShadow: "0 2px 10px #004d4060",
            }}
          >
            <p><b>Nombre:</b> {r.nombre}</p>
            <p><b>Correo:</b> {r.email}</p>
            <p><b>Dirección:</b> {r.direccion}</p>
            <p><b>Día:</b> {r.dia}</p>
            <p><b>Hora:</b> {r.hora}</p>
            <p><b>Colores preferidos:</b> {r.colores}</p>
            <p><b>Técnica:</b> {r.tecnica}</p>
            <p><b>Estilo:</b> {r.estilo}</p>
            <p><b>Fecha reserva:</b> {r.fechaReserva?.toDate ? r.fechaReserva.toDate().toLocaleString() : r.fechaReserva}</p>
          </div>
        ))
      )}
    </div>
  );
}
