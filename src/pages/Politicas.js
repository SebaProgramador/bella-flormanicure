import React from "react";
import { useNavigate } from "react-router-dom";

export default function Politicas() {
  const navigate = useNavigate();

  const handleAceptar = () => {
    navigate("/ficha");
  };

  return (
    <div
      style={{
        maxWidth: 880,
        margin: "40px auto",
        padding: "40px",
        fontFamily: "'Segoe UI', sans-serif",
        background: "linear-gradient(to bottom right, #e1f7f4, #ffffff)",
        borderRadius: "30px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        border: "1px solid #b2dfdb",
      }}
    >
      <h1
        style={{
          fontSize: "30px",
          fontFamily: "'Pacifico', cursive",
          color: "#004d40",
          textAlign: "center",
          marginBottom: "35px",
        }}
      >
        ✨ Reglas y Políticas de Atención Bella Flor ✨
      </h1>

      <ul
        style={{
          fontSize: "20px",
          lineHeight: "2.2",
          paddingLeft: "24px",
          color: "#004d40",
        }}
      >
        <li>
          <span style={{ marginRight: "12px", fontSize: "24px" }}>🎨</span>
          Los diseños deben ser traídos por el cliente.
        </li>
        <li>
          <span style={{ marginRight: "12px", fontSize: "24px" }}>⏰</span>
          El tiempo de espera es de 10 minutos siempre que exista aviso previo.
        </li>
        <li>
          <span style={{ marginRight: "12px", fontSize: "24px" }}>🕒</span>
          Tener en consideración que el tiempo de atención es de <strong>1 hora y 45 minutos aprox</strong>.
        </li>
        <li>
          <span style={{ marginRight: "12px", fontSize: "24px" }}>⚠️</span>
          Si el cliente no hace aviso de su inasistencia, el cobro se hará de todas formas.
        </li>
        <li>
          <span style={{ marginRight: "12px", fontSize: "24px" }}>🏡</span>
          Los servicios se realizan en domicilio del particular.
        </li>
        <li>
          <span style={{ marginRight: "12px", fontSize: "24px" }}>💸</span>
          Pagos por transferencia o efectivo.
        </li>
        <li>
          <span style={{ marginRight: "12px", fontSize: "24px" }}>⏳</span>
          Los pagos se hacen después de haber realizado el trabajo.
        </li>
        <li>
          <span style={{ marginRight: "12px", fontSize: "24px" }}>💖</span>
          Se agradece puntualidad y compromiso para una atención armoniosa.
        </li>
      </ul>

      <div
        style={{
          textAlign: "center",
          marginTop: 50,
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          flexWrap: "wrap",
        }}
      >
        {/* Botón: Volver al Inicio */}
        <button
          style={{
            backgroundColor: "#80cbc4",
            color: "#ffffff",
            border: "none",
            padding: "20px 40px",
            fontSize: "22px",
            fontWeight: "bold",
            borderRadius: "40px",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "14px",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
            transition: "transform 0.3s ease-in-out",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          onClick={() => navigate("/")}
        >
          🏡 Volver al Inicio
        </button>

        {/* Botón: Aceptar y continuar */}
        <button
          style={{
            backgroundColor: "#00796b",
            color: "#ffffff",
            border: "none",
            padding: "20px 40px",
            fontSize: "22px",
            fontWeight: "bold",
            borderRadius: "40px",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "14px",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
            transition: "transform 0.3s ease-in-out",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          onClick={handleAceptar}
        >
          💅 Aceptar y continuar con la ficha
        </button>
      </div>
    </div>
  );
}
