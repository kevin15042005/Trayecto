import express from "express";
import cors from "cors";
import db from "./db.js";
import administrador from "./routes/Administrador.js";
import IngresoTrayecto from "./routes/trayectos.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/administrador", administrador);   
app.use("/api/trayecto", IngresoTrayecto);   

// Ruta raíz para evitar error 404 en Render
app.get("/", (req, res) => {
    res.send("API funcionando correctamente.");
});

app.listen(8080, () => {
    console.log("Servidor corriendo en http://trayecto.onrender.com");
});

process.on("SIGINT", () => {
    db.end((err) => {
        if (err) console.log("Error cerrando a MYSQL", err);
        else console.log("Conexion a MYSQL cerrada");
        process.exit();
    });
});
