import express from "express";
import db from "../db.js";

const router = express.Router();

// Registrar Administrador
router.post("/crear", (req, res) => {
  const {  correo_Administrador, contraseña_Administrador } = req.body;

  const checkQuery = `SELECT * FROM administrador WHERE correo_Administrador = ? `;

  db.query(checkQuery, [correo_Administrador], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error al verificar duplicado", err });
    }

    if (result.length > 0) {
      return res.status(409).json({ message: "Usuario o correo ya registrado" });
    }

    const insertQuery = `INSERT INTO administrador  (correo_Administrador,contraseña_Administrador ) VALUES (?, ?)`;

    db.query(insertQuery, [ correo_Administrador, contraseña_Administrador], (err) => {
      if (err) {
        return res.status(500).json({ message: "Error al registrar administrador", error: err });
      }
      return res.status(201).json({ message: "Administrador registrado correctamente" });
    });
  });
});

// Inicio de sesión
router.post("/login", (req, res) => {
  const { correo_Administrador, contraseña_Administrador } = req.body;

  const q = `SELECT * FROM administrador WHERE correo_Administrador = ? AND contraseña_Administrador = ?`;

  db.query(q, [correo_Administrador, contraseña_Administrador], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error al iniciar sesión", error: err });
    }

    if (data.length > 0) {
      return res.status(200).json({ message: "Inicio de sesión correcto", usuario: data[0] });
    }

    return res.status(404).json({ message: "Credenciales incorrectas" });
  });
});

// Actualizar contraseña
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { contraseñaAntigua, contraseñaNueva } = req.body;

  const verificarQuery = `SELECT contraseña_Administrador FROM administrador WHERE id_Administrador = ?`;

  db.query(verificarQuery, [id], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error al verificar contraseña", error: err });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: "Administrador no encontrado" });
    }

    const contraseñaActual = data[0].contraseña_Administrador;

    if (contraseñaAntigua !== contraseñaActual) {
      return res.status(400).json({ message: "La contraseña actual no coincide" });
    }

    const updateQuery = `UPDATE administrador  SET contraseña_Administrador  = ? WHERE id_Administrador = ?`;

    db.query(updateQuery, [contraseñaNueva, id], (err) => {
      if (err) {
        return res.status(500).json({ message: "Error al actualizar contraseña", error: err });
      }
      return res.json({ message: "Contraseña actualizada exitosamente" });
    });
  });
});

export default router;
