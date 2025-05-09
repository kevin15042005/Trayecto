import express from "express";
import db from "../db.js";

const router = express.Router();


router.get("/obtenerTrayectos", (req, res) => {
  const q = "SELECT * FROM trayecto ORDER BY fecha_Solicitud DESC";

  db.query(q, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error al consultar trayectos", error: err });
    }
    res.status(200).json(result);
  });
});



router.post("/trayectosNuevos", (req, res) => {
  const {
    fecha,
    usuario,
    usuarioPrueba,
    origen,
    destino,
    fechaServicio,
    horaServicio,
  } = req.body;

  const estado = "Pendiente";

  const q = `
  INSERT INTO trayecto(
    fecha_Solicitud,
    usuario,
    usuario_Prueba,
    origen,
    destino,
    fecha_Servicio,
    hora_Servicio,
    id_Administrador
   
  ) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`;

  db.query(
    q,
    [
      fecha,
      usuario,
      usuarioPrueba,
      origen,
      destino,
      fechaServicio,
      horaServicio,
      1
    ],
    (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error al guardar trayecto", error: err });
      }
      res
        .status(201)
        .json({ message: "Trayecto registrado", id: result.insertId });
    }
  );
});
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const q = 'DELETE FROM trayecto WHERE id = ?';

  db.query(q, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    return res.status(200).json({ mensaje: 'Trayecto eliminado correctamente' });
  });
});

export default router;
