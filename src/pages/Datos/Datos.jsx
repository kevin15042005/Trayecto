import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Datos.css";

export default function Datos() {
  const [fecha, setFecha] = useState("");
  const [usuario, setUsuario] = useState("");
  const [usuarioPrueba, setUsuarioPrueba] = useState("");
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [fechaServicio, setFechaServicio] = useState("");
  const [horaServicio, setHoraServicio] = useState("");
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [trayectos, setTrayectos] = useState([]);
  const [idTrayectoEliminar, setIdTrayectoEliminar] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const limpiar = () => {
    setFecha("");
    setUsuario("");
    setUsuarioPrueba("");
    setOrigen("");
    setDestino("");
    setFechaServicio("");
    setHoraServicio("");
  };

  const validarCampos = () => {
    if (
      !fecha ||
      !usuario ||
      !usuarioPrueba ||
      !origen ||
      !destino ||
      !fechaServicio ||
      !horaServicio
    ) {
      alert("Todos los campos son obligatorios");
      return false;
    }
    if (usuario === usuarioPrueba) {
      alert("El usuario no puede ser igual al usuario prueba");
      return false;
    }
    if (origen === destino) {
      alert("El origen no puede ser igual al destino");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(
        "http://trayecto.onrender.com/api/trayecto/trayectosNuevos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fecha,
            usuario,
            usuarioPrueba,
            origen,
            destino,
            fechaServicio,
            horaServicio,
          }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert("Trayecto guardado con éxito");
        limpiar();
        setShowCreatePopup(false);
        setShowConfirmPopup(false);
        obtenerTrayectos();
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      console.error("Error al enviar trayecto", err);
      alert("No se pudo guardar el trayecto");
    }
  };

  const handleConfirm = () => {
    if (validarCampos()) {
      setShowConfirmPopup(true);
    }
  };

  const handleDelete = async () => {
    if (!idTrayectoEliminar) {
      alert("Por favor ingrese un ID de trayecto");
      return;
    }

    try {
      const res = await fetch(
        `http://trayecto.onrender.com/api/trayecto/${idTrayectoEliminar}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert(data.message || "Trayecto eliminado correctamente");
        setIdTrayectoEliminar("");
        setShowDeletePopup(false);
        obtenerTrayectos();
      } else {
        alert(data.error || "Error al eliminar trayecto");
      }
    } catch (err) {
      console.error("Error al eliminar trayecto:", err);
      alert("Error al conectar con el servidor");
    }
  };

  const obtenerTrayectos = async () => {
    try {
      const res = await fetch(
        "http://trayecto.onrender.com/api/trayecto/obtenerTrayectos"
      );
      const data = await res.json();
      setTrayectos(data);
    } catch (error) {
      console.error("Error al obtener trayectos:", error);
    }
  };

  useEffect(() => {
    obtenerTrayectos();
  }, []);

  const CerrarSesion = () => {
    localStorage.clear();
    navigate("/");
  };

  const filteredTrayectos = trayectos.filter((trayecto) =>
    Object.values(trayecto).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <>
      {/* Popup de creación de nuevo trayecto */}
      {showCreatePopup && (
        <div className="popup-overlay">
          <div className="popup-content large-popup">
            <div className="popup-header">
              <h3>Trayectos especiales para el corte de 5-2025</h3>
              <button
                className="close-button"
                onClick={() => setShowCreatePopup(false)}
              >
                
              </button>
            </div>

            <div className="form-container">
              <div className="form-group">
                <label>Fecha</label>
                <input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Usuario</label>
                <select
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  required
                >
                  <option value="">Seleccione un usuario</option>
                  <option value="Kevin">Kevin</option>
                  <option value="Carolina">Carolina</option>
                  <option value="Juan Pablo">Juan Pablo</option>
                  <option value="Jose">Jose</option>
                  <option value="Sandra">Sandra</option>
                </select>
              </div>

              <div className="form-group">
                <label>Usuario Prueba</label>
                <select
                  value={usuarioPrueba}
                  onChange={(e) => setUsuarioPrueba(e.target.value)}
                  required
                >
                  <option value="">Seleccione un usuario</option>
                  <option value="Kevin">Kevin</option>
                  <option value="Carolina">Carolina</option>
                  <option value="Juan Pablo">Juan Pablo</option>
                  <option value="Jose">Jose</option>
                  <option value="Sandra">Sandra</option>
                </select>
              </div>

              <div className="form-group">
                <label>Origen</label>
                <select
                  value={origen}
                  onChange={(e) => setOrigen(e.target.value)}
                  required
                >
                  <option value="">Seleccione un origen</option>
                  <option value="Bogota">Bogota</option>
                  <option value="Cajica">Cajica</option>
                  <option value="Chia">Chia</option>
                  <option value="Sopo">Sopo</option>
                  <option value="Briseño">Briseño</option>
                  <option value="Zipaquira">Zipaquira</option>
                  <option value="Mosquera">Mosquera</option>
                  <option value="Madrid">Madrid</option>
                  <option value="Facatativa">Facatativa</option>
                  <option value="Sibate">Sibate</option>
                  <option value="Fusagasuga">Fusagasuga</option>
                </select>
              </div>

              <div className="form-group">
                <label>Destino</label>
                <select
                  value={destino}
                  onChange={(e) => setDestino(e.target.value)}
                  required
                >
                  <option value="">Seleccione un destino</option>
                  <option value="Bogota">Bogota</option>
                  <option value="Cajica">Cajica</option>
                  <option value="Chia">Chia</option>
                  <option value="Sopo">Sopo</option>
                  <option value="Briseño">Briseño</option>
                  <option value="Zipaquira">Zipaquira</option>
                  <option value="Mosquera">Mosquera</option>
                  <option value="Madrid">Madrid</option>
                  <option value="Facatativa">Facatativa</option>
                  <option value="Sibate">Sibate</option>
                  <option value="Fusagasuga">Fusagasuga</option>
                </select>
              </div>

              <div className="form-group">
                <label>Fecha Servicio</label>
                <input
                  type="date"
                  value={fechaServicio}
                  onChange={(e) => setFechaServicio(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Horario Servicio</label>
                <input
                  type="time"
                  value={horaServicio}
                  onChange={(e) => setHoraServicio(e.target.value)}
                  required
                />
              </div>

              <div className="form-actions">
                <button className="save-button" onClick={handleConfirm}>
                  Guardar Trayecto
                </button>
                <button
                  className="cancel-button"
                  onClick={() => setShowCreatePopup(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Popup de confirmación al guardar */}
      {showConfirmPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Confirmar los datos del trayecto</h3>
            <ul>
              <li>
                <strong>Fecha:</strong> {fecha}
              </li>
              <li>
                <strong>Usuario:</strong> {usuario}
              </li>
              <li>
                <strong>Usuario Prueba:</strong> {usuarioPrueba}
              </li>
              <li>
                <strong>Origen:</strong> {origen}
              </li>
              <li>
                <strong>Destino:</strong> {destino}
              </li>
              <li>
                <strong>Fecha Servicio:</strong> {fechaServicio}
              </li>
              <li>
                <strong>Hora Servicio:</strong> {horaServicio}
              </li>
            </ul>
            <div className="popup-buttons">
              <button className="confirm-button" onClick={handleSubmit}>
                Confirmar
              </button>
              <button
                className="cancel-button"
                onClick={() => setShowConfirmPopup(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup de confirmación para eliminar */}
      {showDeletePopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Confirmar eliminación</h3>
            <p>
              ¿Estás seguro que deseas eliminar el trayecto con ID{" "}
              {idTrayectoEliminar}?
            </p>
            <div className="popup-buttons">
              <button className="confirm-button" onClick={handleDelete}>
                Confirmar
              </button>
              <button
                className="cancel-button"
                onClick={() => setShowDeletePopup(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Vista principal */}
      <div className="main-container">
        <h3 className="title">Trayectos Registrados</h3>
        <div className="filter-section">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Usuario</th>
                <th>Usuario Prueba</th>
                <th>Origen</th>
                <th>Destino</th>
                <th>Fecha Servicio</th>
                <th>Hora Servicio</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrayectos.length === 0 ? (
                <tr>
                  <td colSpan="8">No hay trayectos registrados</td>
                </tr>
              ) : (
                filteredTrayectos.map((t, i) => (
                  <tr key={i}>
                    <td>{t.id_Trayecto}</td>
                    <td>{new Date(t.fecha_Solicitud).toLocaleDateString()}</td>
                    <td>{t.usuario}</td>
                    <td>{t.usuario_Prueba}</td>
                    <td>{t.origen}</td>
                    <td>{t.destino}</td>
                    <td>{new Date(t.fecha_Servicio).toLocaleDateString()}</td>
                    <td>{t.hora_Servicio}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="action-buttons">
          <button
            className="create-button"
            onClick={() => setShowCreatePopup(true)}
          >
            Crear
          </button>

          <div className="delete-section">
            <input
              type="text"
              placeholder="ID a eliminar"
              value={idTrayectoEliminar}
              onChange={(e) => setIdTrayectoEliminar(e.target.value)}
            />
            <button
              className="delete-button"
              onClick={() =>
                idTrayectoEliminar
                  ? setShowDeletePopup(true)
                  : alert("Ingrese un ID")
              }
              disabled={!idTrayectoEliminar}
            >
              Eliminar
            </button>
          </div>

          <button className="logout-button" onClick={CerrarSesion}>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </>
  );
}