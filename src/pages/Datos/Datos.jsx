import React, { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";


export default function Datos() {
  const [fecha, setFecha] = useState("");
  const [usuario, setUsuario] = useState("");
  const [usuarioPrueba, setUsuarioPrueba] = useState("");
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [fechaServicio, setFechaServicio] = useState("");
  const [horaServicio, setHoraServicio] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [trayectos, setTrayectos] = useState([]);

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
    return true;
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/trayecto/trayectosNuevos", {
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
      });

      const data = await res.json();
      if (res.ok) {
        alert("Trayecto guardado con éxito");
        limpiar();
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
      handleSubmit();
      setShowPopup(false);
    }
  };

  useEffect(() => {
  const obtenerTrayectos = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/trayecto/obtenerTrayectos");
      const data = await res.json();
      setTrayectos(data); // Asegúrate de que `data` sea un array
    } catch (error) {
      console.error("Error al obtener trayectos:", error);
    }
  };

  obtenerTrayectos();
}, []);

  
  const CerrarSesion = () => {
    localStorage.clear
    navigate("/");
  }

  return (
    <>
      <div>
        <h3>Trayectos especiales para el corte de 5-2025</h3>
      </div>
      <div className="Filtrado">
        <input type="text" required />
      </div>

      <div className="Vista-Ingresar">
        <section>
          <label>Fecha</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </section>
        <label>Usuario</label>

        <select
          name="tipo-Usuario"
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
        <label>Usuario Prueba</label>

        <select
          name="tipo-Usuario-Prueba"
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
        <label>Origen</label>

        <select
          name="tipo-Origen"
          value={origen}
          onChange={(e) => setOrigen(e.target.value)}
          required
        >
          <option value="">Seleccione un usuario</option>
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
        <label>Destino</label>

        <select
          name="tipo-Destino"
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
          required
        >
          <option value="">Seleccione un usuario</option>
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
        <section>
          <label>Fecha Servicio</label>
          <input
            type="date"
            value={fechaServicio}
            onChange={(e) => setFechaServicio(e.target.value)}
            required
          />
        </section>
        <section>
          <label>Horario Servicio</label>
          <input
            type="time"
            value={horaServicio}
            onChange={(e) => setHoraServicio(e.target.value)}
            required
          />
        </section>
        <div className="Vista-Datos-Ingresar">
          <button
            onClick={() => {
              if (validarCampos()) setShowPopup(true);
            }}
          >
            Guardar Trayecto
          </button>
        </div>
      </div>

      {showPopup && (
        <div>
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
          <button onClick={handleConfirm}>Confirmar</button>
          <button onClick={() => setShowPopup(false)}>Cancelar</button>
        </div>
      )}

      <div>
        <h3>Trayectos Registrados</h3>
<table border="1">
  <thead>
    <tr>
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
    {trayectos.length === 0 ? (
      <tr><td colSpan="7">No hay trayectos registrados</td></tr>
    ) : (
      trayectos.map((t, i) => (
        <tr key={i}>
          <td>{t.fecha_Solicitud}</td>
          <td>{t.usuario}</td>
          <td>{t.usuario_Prueba}</td>
          <td>{t.origen}</td>
          <td>{t.destino}</td>
          <td>{t.fecha_Servicio}</td>
          <td>{t.hora_Servicio}</td>
        </tr>
      ))
    )}
  </tbody>
        </table>
        <button onClick={CerrarSesion} ></button>

      </div>
    </>
  );
}
