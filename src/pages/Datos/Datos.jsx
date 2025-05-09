import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Datos.css";

const Datos = () => {
  const [trayectos, setTrayectos] = useState([]);
  const [nuevoTrayecto, setNuevoTrayecto] = useState({
    fecha: "",
    usuario: "",
    usuarioPrueba: "",
    origen: "",
    destino: "",
    fechaServicio: "",
    horaServicio: "",
  });

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [idTrayectoEliminar, setIdTrayectoEliminar] = useState("");

  // Función para obtener trayectos
  const fetchTrayectos = () => {
    axios
      .get("http://localhost:8080/trayecto/obtenerTrayectos")
      .then((res) => {
        setTrayectos(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener trayectos:", err);
      });
  };

  // Cargar trayectos al inicio
  useEffect(() => {
    fetchTrayectos();
  }, []);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    setNuevoTrayecto({
      ...nuevoTrayecto,
      [e.target.name]: e.target.value,
    });
  };

  // Enviar nuevo trayecto
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/trayecto/trayectosNuevos", nuevoTrayecto)
      .then((res) => {
        alert(res.data.message);
        setNuevoTrayecto({
          fecha: "",
          usuario: "",
          usuarioPrueba: "",
          origen: "",
          destino: "",
          fechaServicio: "",
          horaServicio: "",
        });
        fetchTrayectos();
      })
      .catch((err) => {
        alert("Error al guardar trayecto");
        console.error(err);
      });
  };

  // Eliminar trayecto
  const eliminarTrayecto = () => {
    axios
      .delete(`http://localhost:8080/trayecto/${idTrayectoEliminar}`)
      .then((res) => {
        alert(res.data.mensaje);
        setShowDeletePopup(false);
        setIdTrayectoEliminar("");
        fetchTrayectos(); // ✅ recarga desde la base de datos
      })
      .catch((err) => {
        alert("Error al eliminar trayecto");
        console.error(err);
      });
  };

  return (
    <div className="datos-container">
      <h2>Registrar Trayecto</h2>
      <form onSubmit={handleSubmit} className="formulario">
        <input type="date" name="fecha" value={nuevoTrayecto.fecha} onChange={handleInputChange} required />
        <input type="text" name="usuario" placeholder="Usuario" value={nuevoTrayecto.usuario} onChange={handleInputChange} required />
        <input type="text" name="usuarioPrueba" placeholder="Usuario Prueba" value={nuevoTrayecto.usuarioPrueba} onChange={handleInputChange} />
        <input type="text" name="origen" placeholder="Origen" value={nuevoTrayecto.origen} onChange={handleInputChange} required />
        <input type="text" name="destino" placeholder="Destino" value={nuevoTrayecto.destino} onChange={handleInputChange} required />
        <input type="date" name="fechaServicio" value={nuevoTrayecto.fechaServicio} onChange={handleInputChange} required />
        <input type="time" name="horaServicio" value={nuevoTrayecto.horaServicio} onChange={handleInputChange} required />
        <button type="submit">Registrar</button>
      </form>

      <h2>Lista de Trayectos</h2>
      <table className="tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha Solicitud</th>
            <th>Usuario</th>
            <th>Prueba</th>
            <th>Origen</th>
            <th>Destino</th>
            <th>Fecha Servicio</th>
            <th>Hora Servicio</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {trayectos.map((tray) => (
            <tr key={tray.id}>
              <td>{tray.id}</td>
              <td>{tray.fecha_Solicitud?.slice(0, 10)}</td>
              <td>{tray.usuario}</td>
              <td>{tray.usuario_Prueba}</td>
              <td>{tray.origen}</td>
              <td>{tray.destino}</td>
              <td>{tray.fecha_Servicio?.slice(0, 10)}</td>
              <td>{tray.hora_Servicio}</td>
              <td>
                <button onClick={() => {
                  setIdTrayectoEliminar(tray.id);
                  setShowDeletePopup(true);
                }}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showDeletePopup && (
        <div className="popup">
          <p>¿Estás seguro de eliminar este trayecto?</p>
          <button onClick={eliminarTrayecto}>Sí</button>
          <button onClick={() => setShowDeletePopup(false)}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default Datos;
