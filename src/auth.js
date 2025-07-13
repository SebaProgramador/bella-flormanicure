// auth.js

export const guardarSesionAdmin = () => {
  localStorage.setItem("adminAutenticado", "true");
};

export const cerrarSesionAdmin = () => {
  localStorage.removeItem("adminAutenticado");
};

export const estaAutenticadoAdmin = () => {
  return localStorage.getItem("adminAutenticado") === "true";
};
