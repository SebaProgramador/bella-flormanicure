import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/fotos/logo.jpg";
import fondoLogin from "../assets/fotos/fondo-login.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginAdmin() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const [mostrarClave, setMostrarClave] = useState(false);
  const [mostrarUsuario, setMostrarUsuario] = useState(false);

  const handleLogin = () => {
    if (usuario === "bellaflormanicure@gmail.com" && clave === "Bell@Flor2025") {
      sessionStorage.setItem("adminLogueado", "true");
      navigate("/admin");
    } else {
      setError("❌ Usuario o clave incorrecta.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${fondoLogin})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          maxWidth: 420,
          width: "100%",
          padding: 35,
          borderRadius: 30,
          background: "rgba(255, 255, 255, 0.95)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          fontFamily: "Segoe UI, sans-serif",
          animation: "fadeInCaja 1.2s ease-in-out",
        }}
      >
        {/* Logo Bella Flor */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <img
            src={logo}
            alt="Logo Bella Flor"
            style={{
              width: "160px",
              height: "160px",
              borderRadius: "50%",
              objectFit: "cover",
              boxShadow: "0 0 25px #a5d6a7",
              animation: "fadeInLogo 1.5s ease-in-out",
            }}
          />
        </div>

        {/* Mensaje de bienvenida */}
        <div
          style={{
            textAlign: "center",
            fontSize: "20px",
            color: "#2e7d32",
            fontWeight: "bold",
            marginBottom: 12,
            animation: "fadeInMensaje 1.8s ease-in-out",
          }}
        >
          🌼¡Bienvenida Administradora Bella Flor!🌼
        </div>

        <h2 style={{ textAlign: "center", color: "#2e7d32", marginBottom: 25 }}>
          🔐 Acceso exclusivo para la administración
        </h2>

        {/* Campo Usuario con icono mostrar/ocultar */}
        <div style={{ position: "relative" }}>
  <input
    type={mostrarUsuario ? "text" : "password"} // se comporta como clave
    placeholder="👤 Usuario"
    value={usuario}
    onChange={(e) => setUsuario(e.target.value)}
    style={estiloInput}
  />
  <span
    onClick={() => setMostrarUsuario(!mostrarUsuario)}
    style={iconoEstilo}
  >
    {mostrarUsuario ? <FaEyeSlash /> : <FaEye />}
  </span>
</div>


        {/* Campo Clave con icono mostrar/ocultar */}
        <div style={{ position: "relative" }}>
          <input
            type={mostrarClave ? "text" : "password"}
            placeholder="🔒 Clave"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            style={estiloInput}
          />
          <span
            onClick={() => setMostrarClave(!mostrarClave)}
            style={iconoEstilo}
          >
            {mostrarClave ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Mensaje de error */}
        {error && (
          <p style={{ color: "#d32f2f", textAlign: "center", fontWeight: "bold", marginBottom: 10 }}>
            {error}
          </p>
        )}

        {/* Botón de iniciar sesión */}
        <button
          onClick={handleLogin}
          style={botonLoginEstilo}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          ✅ Iniciar sesión
        </button>

        {/* Botón para volver al inicio */}
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <button
            onClick={() => navigate("/")}
            style={botonVolverEstilo}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            ⬅️ Volver al Inicio
          </button>
        </div>

        {/* Animaciones CSS */}
        <style>
          {`
            @keyframes fadeInLogo {
              0% { opacity: 0; transform: scale(0.8); }
              100% { opacity: 1; transform: scale(1); }
            }
            @keyframes fadeInMensaje {
              0% { opacity: 0; transform: translateY(-10px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            @keyframes fadeInCaja {
              0% { opacity: 0; transform: translateY(40px); }
              100% { opacity: 1; transform: translateY(0); }
            }
          `}
        </style>
      </div>
    </div>
  );
}

// Estilo del input
const estiloInput = {
  width: "100%",
  padding: "12px 14px",
  marginBottom: "14px",
  border: "2px solid #a5d6a7",
  borderRadius: "12px",
  fontSize: "16px",
  fontWeight: "600",
  outlineColor: "#66bb6a",
  background: "#f9fbe7",
  boxShadow: "inset 0 0 6px #a5d6a750",
};

// Estilo del icono 👁️
const iconoEstilo = {
  position: "absolute",
  right: 15,
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer",
  color: "#66bb6a",
  fontSize: "18px",
};

// Botón iniciar sesión
const botonLoginEstilo = {
  background: "linear-gradient(to right, #66bb6a, #a5d6a7)",
  color: "white",
  border: "none",
  padding: "14px 22px",
  borderRadius: "30px",
  fontSize: "18px",
  fontWeight: "bold",
  cursor: "pointer",
  width: "100%",
  boxShadow: "0 6px 14px rgba(0,0,0,0.2)",
  transition: "transform 0.3s ease-in-out",
};

// Botón volver
const botonVolverEstilo = {
  background: "#81c784",
  color: "white",
  padding: "10px 22px",
  border: "none",
  borderRadius: "25px",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  transition: "transform 0.3s ease-in-out",
};
