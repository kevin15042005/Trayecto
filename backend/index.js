import express from "express";
import db from "./db.js";
import administrador from "./routes/Administrador.js";
import IngresoTrayecto from "./routes/trayectos.js";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Obtener ruta __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware para leer JSON
app.use(express.json());

// Rutas del backend
app.use("/administrador", administrador);
app.use("/api/trayecto", IngresoTrayecto);

// Servir archivos estáticos del frontend (React)
app.use(express.static(path.join(__dirname, '../dist')));

// Ruta principal de prueba del backend
app.get('/', (req, res) => {
  res.send('🚀 Backend Trayecto activo');
});

// Redirigir todo lo demás a React (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Iniciar servidor (Render requiere process.env.PORT)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  console.log("Conectado a la base de datos MySQL");
});

// Manejar cierre del servidor y conexión MySQL
process.on("SIGINT", () => {
  db.end((err) => {
    if (err) console.log("Error cerrando conexión MySQL:", err);
    else console.log("Conexión MySQL cerrada");
    process.exit();
  });
});
