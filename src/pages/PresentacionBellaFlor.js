import React from "react";
import { FaStar, FaPaintBrush, FaFlower, FaInstagram, FaEnvelope } from "react-icons/fa";

export default function PresentacionBellaFlor() {
  return (
    <div
      style={{
        backgroundColor: "#a7ffeb",
        color: "#004d40",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        maxWidth: 500,
        margin: "50px auto",
        padding: "30px",
        borderRadius: "30px",
        boxShadow: "0 8px 20px rgba(0, 77, 64, 0.2)",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          textShadow: "1px 1px 3px #004d4040",
        }}
      >
        <FaPaintBrush color="#00796b" />
        💅✨ ¡Gracias Por Elegir Bella Flor! ✨
        <FaStar color="#ffb300" />
      </h2>

      <p
        style={{
          fontSize: "1.2rem",
          fontWeight: "500",
          lineHeight: "1.6",
          marginBottom: "25px",
        }}
      >
        Tu belleza, tu brillo <FaStar color="#ffeb3b" /> y tus uñas nos inspiran
        a crear arte con amor y dedicación. 🎨💖
      </p>

      <p
        style={{
          fontSize: "1.1rem",
          marginBottom: "15px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <FaInstagram color="#c2185b" />
        <a
          href="https://www.instagram.com/bellaflor_manicure"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#004d40",
            fontWeight: "bold",
            textDecoration: "underline",
          }}
        >
          @bellaflor_manicure
        </a>
      </p>

      <p
        style={{
          fontSize: "1.1rem",
          marginBottom: "15px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <FaEnvelope color="#00796b" />
        <a
          href="mailto:bellaflormanicure@gmail.com"
          style={{
            color: "#004d40",
            fontWeight: "bold",
            textDecoration: "underline",
          }}
        >
          bellaflormanicure@gmail.com
        </a>
      </p>

      <p
        style={{
          fontSize: "1.1rem",
          fontWeight: "600",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <FaFlower color="#388e3c" />
        Atención exclusiva en Puerto Montt, Chile — con mucho cariño 🌸
        <FaFlower color="#388e3c" />
      </p>
    </div>
  );
}
