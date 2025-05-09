import express from "express";
import cors from "cors";
import db from "./db.js";
import administrador from "./routes/Administrador.js";
import IngresoTrayecto from "./routes/trayectos.js";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Obtener la ruta del archivo actual para usar en el __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware para parsear JSON y permitir CORS
app.use(express.json());
app.use(cors());

// Rutas de la API
app.use("/administrador", administrador);
app.use("/api/trayecto", IngresoTrayecto);

// Sirve los archivos estáticos de React desde la carpeta 'dist'
app.use(express.static(path.join(__dirname, '../dist')));

// Ruta principal de la API
app.get('/', (req, res) => {
  res.send('🚀 Backend Trayecto activo');
});

// Redirige todas las demás rutas al index.html de React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Conexión a la base de datos MySQL
app.listen(process.env.PORT || "http://localhost:8080", () => {
  console.log("Servidor corriendo en http://trayecto.onrender.com");
  console.log("Conectado a la base de datos MySQL");
});

// Manejo del cierre del proceso
process.on("SIGINT", () => {
  db.end((err) => {
    if (err) console.log("Error cerrando a MYSQL", err);
    else console.log("Conexion a MYSQL cerrada");
    process.exit();
  });
});
