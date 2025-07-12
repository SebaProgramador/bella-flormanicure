// src/components/BotonConIcono.jsx
import React from "react";

export default function BotonConIcono({ texto, icono, onClick, colorFondo = "#00bfa6" }) {
  return (
    <button
      style={{
        backgroundColor: colorFondo,
        color: "white",
        border: "none",
        padding: "14px 28px",
        fontSize: "16px",
        fontWeight: "bold",
        borderRadius: "12px",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
        transition: "transform 0.2s ease-in-out",
      }}
      onClick={onClick}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {icono}
      {texto}
    </button>
  );
}
