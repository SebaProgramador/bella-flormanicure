import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { GiFlowerTwirl } from "react-icons/gi";
import { FaInstagram, FaEnvelope } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Inicio() {
  const navigate = useNavigate();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div
      style={{
        maxWidth: 950,
        margin: "0 auto",
        padding: 20,
        fontFamily: "'Quicksand', sans-serif",
        backgroundColor: "#e0f7fa",
        borderRadius: "20px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.1)"
      }}
    >
      {/* Logo */}
      <img
        src={require("../assets/fotos/logo.jpg")}
        alt="Logo Bella Flor"
        style={{
          width: 140,
          display: "block",
          margin: "0 auto 25px",
          borderRadius: "50%",
          border: "4px solid #80cbc4",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
        }}
      />

      {/* Título */}
      <h1
        style={{
          textAlign: "center",
          fontFamily: "'Great Vibes', cursive",
          fontSize: "3em",
          color: "#00796b",
          marginBottom: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px"
        }}
      >
        Bienvenida a Bella Flor <GiFlowerTwirl size={36} />
      </h1>

      {/* Carrusel */}
      <section style={{ margin: "40px 0" }}>
        <h2 style={{ color: "#004d40", textAlign: "center", marginBottom: "20px", fontWeight: "bold" }}>
          💅 Diseños destacados 💅
        </h2>
        <Slider {...sliderSettings}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n}>
              <img
                src={require(`../assets/fotos/foto${n}.jpg`)}
                alt={`Foto ${n}`}
                style={{
                  width: "90%",
                  maxHeight: "260px",
                  objectFit: "cover",
                  borderRadius: "16px",
                  margin: "0 auto",
                  display: "block",
                  border: "5px solid #ffffff",
                  boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
                  transition: "transform 0.3s ease"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
            </div>
          ))}
        </Slider>
      </section>

      {/* Sobre mí */}
      <div
        style={{
          background: "#ffffff",
          padding: "25px",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          marginBottom: "30px",
          fontSize: "1.2em",
          color: "#004d40",
          lineHeight: 1.6,
        }}
      >
        ✨ <strong>Sobre mí</strong> ✨
        <p style={{ marginTop: "10px" }}>
          Soy especialista en manicure con vocación artística.  
          Cada diseño es único y busca resaltar la belleza natural con estilo,  
          dedicación y técnicas personalizadas. Me encanta conectar con cada clienta  
          y dejar una huella bella en sus manos.
        </p>
      </div>

      {/* Propósito y Meta */}
      <div
        style={{
          background: "#ffffff",
          padding: "25px",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          marginBottom: "30px",
          fontSize: "1.2em",
          color: "#004d40",
          lineHeight: 1.6,
        }}
      >
      <section className="seccion">
  <h2>🎯 Mi propósito</h2>
  <p>
    Mi propósito es que cada una de mis clientas resalte su belleza natural a través de la creación de diseños innovadores y únicos.  
    Me encantaría que cada una salga con una sonrisa y con la satisfacción de que he hecho un trabajo con dedicación, de acuerdo a las expectativas que han puesto en mi trabajo. 💅💖
  </p>
</section>


         🌷 <strong>Mi meta </strong> 🌷
        <p style={{ marginTop: "10px" }}>
          Convertirme en una profesional reconocida, creando experiencias inolvidables.
        </p>
      </div>

      {/* Botones */}
      <div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "25px",
    flexWrap: "wrap",
    marginTop: "50px"
  }}
>
  <button
    onClick={() => navigate("/politicas")}
    style={{
      background: "linear-gradient(to right, #4db6ac, #81c784)",
      color: "white",
      border: "none",
      padding: "18px 40px", // más grande
      borderRadius: "40px",
      fontSize: "20px", // más grande
      fontWeight: "bold",
      cursor: "pointer",
      boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
      transition: "transform 0.2s",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
  >
    💖 Agendar cita
  </button>

  <button
    onClick={() => navigate("/login")}
    style={{
      background: "#26a69a",
      color: "white",
      border: "none",
      padding: "18px 40px", // más grande
      borderRadius: "40px",
      fontSize: "20px", // más grande
      fontWeight: "bold",
      cursor: "pointer",
      boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
      transition: "transform 0.2s",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
  >
    🔒 Solo ADM
  </button>
</div>

      {/* Footer con íconos y enlace real */}
      <footer
        style={{
          background: "linear-gradient(135deg, #a7ffeb, #ffffff)",
          color: "#004d40",
          textAlign: "center",
          padding: "30px 20px",
          borderTop: "3px solid #64b5f6",
          fontFamily: "'Quicksand', sans-serif",
          marginTop: "60px",
        }}
      >
        <h2
          style={{
            fontFamily: "'Pacifico', cursive",
            fontSize: "2.4rem",
            fontWeight: "normal",
            color: "#00796b",
            marginBottom: "14px",
          }}
        >
          💅✨ ¡Gracias Por Elegir Bella Flor!
        </h2>

        <p style={{ fontSize: "16px", margin: "8px 0" }}>
          Tu belleza, tu brillo 🌟 y tus uñas nos inspiran a crear arte con amor y dedicación. 🎨💖
        </p>

        <p style={{ margin: "10px 0", fontSize: "15px" }}>
          🌷 Síguenos:{" "}
          <a
            href="https://www.instagram.com/bellaflor_manicure"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#00796b", fontWeight: "bold", textDecoration: "underline" }}
          >
            @bellaflor_manicure <FaInstagram />
          </a>
        </p>

        <p style={{ margin: "10px 0", fontSize: "15px" }}>
          💌 Escríbenos:{" "}
          <a
            href="mailto:bellaflormanicure@gmail.com"
            style={{ color: "#00796b", textDecoration: "underline" }}
          >
            bellaflormanicure@gmail.com <FaEnvelope />
          </a>
        </p>

        <p style={{ marginTop: "12px", fontSize: "15px" }}>
          📍 Atención exclusiva en <strong>Puerto Montt, Chile</strong> — con mucho cariño 🌸
        </p>

        <div style={{ marginTop: "20px", fontSize: "24px" }}>💅🌟🌸</div>
      </footer>
    </div>
  );
}
