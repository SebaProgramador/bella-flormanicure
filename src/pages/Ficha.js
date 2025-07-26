import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import emailjs from "@emailjs/browser";

export default function Ficha() {
  const navigate = useNavigate();
  const MAX_CUPOS = 10;

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    direccion: "",
    telefono: "",
    dia: "",
    hora: "",
    colores: "",
    tecnica: "Marmolado",
    estilo: "Puntos",
  });

  const [reservas, setReservas] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [cargando, setCargando] = useState(false);

  const horariosSemana = {
    Lunes: ["09:00", "10:00", "11:00", "12:00", "13:00"],
    Martes: ["09:00", "10:00", "11:00", "12:00", "13:00"],
    Miércoles: ["17:30", "18:30", "19:30", "20:30"],
    Jueves: [
      "09:00", "10:00", "11:00", "12:00", "13:00",
      "17:30", "18:30", "19:30", "20:30",
    ],
    Sábado: [
      "09:00", "10:00", "11:00", "12:00", "13:00",
      "14:00", "15:00", "16:00", "17:00",
      "18:00", "19:00", "20:00", "21:00",
    ],
  };

  useEffect(() => {
    const cargarReservasFirebase = async () => {
      try {
        const snapshot = await getDocs(collection(db, "reservas"));
        const datos = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReservas(datos);
      } catch (error) {
        console.error("Error cargando reservas:", error);
      }
    };

    cargarReservasFirebase();
  }, []);

  const cuposRestantes = MAX_CUPOS - reservas.length;

  const horasReservadasDelDia = reservas
    .filter((r) => r.dia === form.dia)
    .map((r) => r.hora);

  const handleDiaClick = (dia) => {
    setForm((prev) => ({ ...prev, dia, hora: "" }));
    setHorariosDisponibles(horariosSemana[dia]);
  };

  const handleHoraClick = (hora) => {
    if (!horasReservadasDelDia.includes(hora)) {
      setForm((prev) => ({ ...prev, hora }));
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const enviarEmails = async (datos) => {
    const templateParams = {
      nombre: datos.nombre,
      email: datos.email,
      direccion: datos.direccion,
      telefono: datos.telefono,
      dia: datos.dia,
      hora: datos.hora,
      colores: datos.colores,
      tecnica: datos.tecnica,
      estilo: datos.estilo,
    };

    try {
      await emailjs.send("service_uouc02c", "template_dueña123", templateParams, "2XRsP0YyyNIUB-wnm");
      await emailjs.send("service_uouc02c", "template_cliente123", templateParams, "2XRsP0YyyNIUB-wnm");
    } catch (error) {
      console.error("Error enviando emails:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cuposRestantes <= 0) {
      setMensaje("❌ Cupos agotados este mes. ¡Gracias por tu interés!");
      return;
    }
    if (!form.dia || !form.hora) {
      setMensaje("❗ Por favor, selecciona un día y una hora disponibles.");
      return;
    }

    setCargando(true);

    try {
      const docRef = await addDoc(collection(db, "reservas"), {
        ...form,
        fechaReserva: Timestamp.now(),
      });

      setReservas([...reservas, { ...form, id: docRef.id }]);

      await enviarEmails(form);

      setMensaje("✅ ¡Reserva exitosa! Revisa tu correo 📩");

      setForm({
        nombre: "",
        email: "",
        direccion: "",
        telefono: "",
        dia: "",
        hora: "",
        colores: "",
        tecnica: "Marmolado",
        estilo: "Puntos",
      });
      setHorariosDisponibles([]);

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Error al reservar:", error);
      setMensaje("❌ Error al reservar. Intenta nuevamente.");
    }

    setCargando(false);
  };

  const mensajeCupos = () => {
    if (cuposRestantes === 0) return "❌ Cupos agotados este mes.";
    if (cuposRestantes === 1) return "⚠️ ¡Último cupo disponible!";
    return `🧮 Cupos disponibles: ${cuposRestantes} / ${MAX_CUPOS}`;
  };

  return (
    <div style={{ padding: 30, maxWidth: 650, margin: "30px auto", background: "linear-gradient(135deg, #a7ffeb, #64b5f6)", borderRadius: "25px", fontFamily: "'Segoe UI', sans-serif", boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)", color: "#004d40" }}>
      <h2 style={{ textAlign: "center", marginBottom: 30, fontWeight: "900", fontSize: "2.4rem" }}>🌸 Ficha de Atención Bella Flor 💅🏻🖌✨</h2>

      <div style={{ marginBottom: 20, fontSize: "20px", color: cuposRestantes <= 1 ? "#d84315" : "#004d40", textAlign: "center", fontWeight: "700", padding: "10px", backgroundColor: cuposRestantes <= 1 ? "#ffccbc" : "#b2dfdb", borderRadius: "15px" }}>
        {mensajeCupos()}
      </div>

      {cargando && (
        <div style={{ textAlign: "center", marginBottom: 15, fontWeight: "bold", color: "#004d40", fontSize: "18px" }}>
          ⏳ Reservando...
        </div>
      )}

      {!cargando && cuposRestantes > 0 && (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          <input style={inputStyle} name="nombre" placeholder="Tu Nombre" value={form.nombre} onChange={handleChange} required />
          <input style={inputStyle} name="email" placeholder="Tu Correo" value={form.email} onChange={handleChange} required />
          <input style={inputStyle} name="direccion" placeholder="Dirección" value={form.direccion} onChange={handleChange} required />
          <input style={inputStyle} name="telefono" placeholder="Teléfono (WhatsApp)" value={form.telefono} onChange={handleChange} required />
          <input style={inputStyle} name="colores" placeholder="Colores que deseas" value={form.colores} onChange={handleChange} />

          {/* Texto TÉCNICAS */}
          <div style={{ fontWeight: "bold" }}>Técnica que deseas:</div>
          <select style={inputStyle} name="tecnica" value={form.tecnica} onChange={handleChange}>
            <option value="Marmolado">Marmolado</option>
            <option value="Stickers al agua">Stickers al agua</option>
            <option value="Francesa">Francesa</option>
          </select>

          {/* Texto DISEÑOS */}
          <div style={{ fontWeight: "bold" }}>Diseño que prefieres:</div>
          <select style={inputStyle} name="estilo" value={form.estilo} onChange={handleChange}>
            <option value="Puntos">Puntos</option>
            <option value="Flores">Flores</option>
            <option value="Hojas">Hojas</option>
          </select>

          <div style={{ fontWeight: "bold" }}>Selecciona un Día:</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {Object.keys(horariosSemana).map((dia) => (
              <button key={dia} type="button" onClick={() => handleDiaClick(dia)} style={{ backgroundColor: form.dia === dia ? "#004d40" : "#a7ffeb", color: form.dia === dia ? "#fff" : "#004d40", padding: "10px 20px", border: "none", borderRadius: "20px", cursor: "pointer", fontWeight: "bold" }}>
                {dia}
              </button>
            ))}
          </div>

          {form.dia && (
            <>
              <div style={{ fontWeight: "bold", marginTop: 15 }}>Selecciona una Hora:</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {horariosDisponibles.map((hora) => {
                  const reservado = horasReservadasDelDia.includes(hora);
                  return (
                    <button key={hora} type="button" onClick={() => handleHoraClick(hora)} disabled={reservado} style={{ backgroundColor: form.hora === hora ? "#004d40" : reservado ? "#ccc" : "#a7ffeb", color: reservado ? "#666" : form.hora === hora ? "#fff" : "#004d40", padding: "10px 16px", border: "none", borderRadius: "20px", cursor: reservado ? "not-allowed" : "pointer", fontWeight: "bold" }}>
                      {hora}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          <button type="submit" style={{ marginTop: 20, background: "#004d40", color: "white", padding: "16px 32px", border: "none", borderRadius: "30px", fontSize: "18px", fontWeight: "700", cursor: "pointer", boxShadow: "0 4px 12px #004d40" }}>
            ✅ Reservar Cita
          </button>
        </form>
      )}

      {mensaje && (
        <div style={{ marginTop: "25px", padding: "15px", background: "#fffde7", borderLeft: "8px solid #fbc02d", borderRadius: "15px", color: "#827717", textAlign: "center", fontWeight: "700", fontSize: "18px" }}>
          {mensaje}
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <button onClick={() => navigate("/")} style={{ background: "#a7ffeb", color: "#004d40", padding: "16px 32px", border: "none", borderRadius: "30px", fontSize: "18px", fontWeight: "700", cursor: "pointer", boxShadow: "0 4px 12px #004d40" }}>
          ⬅️ Volver al Inicio
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "14px 16px",
  borderRadius: "15px",
  border: "2px solid #00796b",
  fontSize: "16px",
  fontWeight: "600",
  outlineColor: "#004d40",
  boxShadow: "0 0 8px #a7ffeb70",
};
