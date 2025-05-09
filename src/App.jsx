import { useState } from "react";
import "./App.css";
import {  useNavigate } from "react-router-dom";

export default function App() {
  const [currentForm, setCurrentForm] = useState(() => {
    return localStorage.getItem("currentForm") || "loging";
  });

  const [correoCrear, setCorreoCrear] = useState("");
  const [contraseñaCrear, setContraseñaCrear] = useState("");
  const [showContraseña, setShowContraseña] = useState(false);


  const useNavigation = useNavigate();

  const changeForm = (formName) => {
    setCurrentForm(formName);
    localStorage.setItem("currentForm", formName);
  };

  const limpiarCampos = () => {
    setCorreoCrear("");
    setContraseñaCrear("");
  };

  // Iniciar Sesión
  const handleIniciar = async (e) => {
    e.preventDefault();
    const correo = e.target.correo.value;
    const contraseña = e.target.contraseña.value;

    try {
      const res = await fetch("http://localhost:8080/administrador/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo_Administrador: e.target.correo.value,
          contraseña_Administrador: e.target.contraseña.value,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅Inicio de sesión correcto");
        useNavigation("/datos")
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        localStorage.setItem("ingreso", "true");
      } else {
        throw new Error(data.message || "Credenciales incorrectas");
      }
    } catch (err) {
      console.error("Error al iniciar sesión", err);
      alert("❌Error al iniciar sesión");
      localStorage.setItem("ingreso", "false");
    }
  };

  // Crear usuario
  const handleCrear = async (e) => {
    e.preventDefault();
    if (!correoCrear || !contraseñaCrear) {
      alert("Por favor ingrese todos los campos");
      return;
    }
    if (contraseñaCrear.length < 8) {
      alert("La contraseña debe tener mínimo 8 caracteres");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/administrador/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo_Administrador: correoCrear,
          contraseña_Administrador: contraseñaCrear,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Registro  correcto");
        limpiarCampos();
      } else {
        throw new Error(data.message || "Error al registrar ");
      }
    } catch (err) {
      console.error("Error al registrar ", err);
      alert("Error al registrar ");
    }
  };

  // Actualizar contraseña
  const handleActualizar = async (e) => {
    e.preventDefault();
    const correo = e.target.correo.value;
    const contraseñaAntigua = e.target.contraseñaantigua.value;
    const contraseñaNueva = e.target.contraseñanueva.value;

    const user = JSON.parse(localStorage.getItem("usuario"));
    if (!correo || !user.correo_Administrador) {
      alert("No hay usuario registrado");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/${user.id_Administrador}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
      contraseñaAntigua: contraseñaAntigua,
  contraseñaNueva: contraseñaNueva,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Contraseña actualizada correctamente");
        changeForm("loging");
      } else {
        alert(data.message || "Error al actualizar contraseña");
      }
    } catch (err) {
      console.error("Error al actualizar contraseña", err);
      alert("Error al actualizar contraseña");
    }
  };

  return (
    <div>
      <h1>Bienvenido a Inpahu-Drive</h1>
      <p>Debe Registrarse para poder hacer Ingreso</p>
      <main className="main">
        {/* Inicio de sesión */}
        {currentForm === "loging" && (
          <div className="ingreso">
            <form className="texto" onSubmit={handleIniciar}>
              <h2>Inicio de sesión</h2>
              <div className="input-box">
                <label  className="Ingreso-CC">Usuario</label>
                <input
                  type="text"
                  id="correo"
                  className="field"
                  placeholder="Correo"
                  name="Correo"
                  required
                />
                <label htmlFor="contraseña" className="Ingreso-CC">Contraseña</label>
                <input
                  type={showContraseña ? "text" : "password"}
                  id="contraseña"
                  className="field"
                  placeholder="Contraseña"
                  name="contraseña"
                  required
                />
               
                

               <div className="input-check">
                  <input
                    type="checkbox"
                    id="mostrar-contraseña"
                    onChange={() => setShowContraseña(!showContraseña)}
                  />
                  <label htmlFor="mostrar-contraseña" className="Mostrar-Contraseña">Mostrar contraseña</label>
                </div>

                <div className="boton-ingresar">
                  <button type="submit" >
                    Ingresar
                  </button>
                  <div className="registra">
                    {/*
                    <button
                      type="button"
                      onClick={() => changeForm("olvidar-contraseña")}
                    >
                      Olvidé contraseña
                    </button>*/}
                    <button
                      type="button"
                      onClick={() => changeForm("registrar")}
                    >
                      Registrarse
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Recuperar contraseña */}
        {/*
        {currentForm === "olvidar-contraseña" && (
          <div className="olvidar-contraseña">
            <form onSubmit={handleActualizar}>
              <h2>Olvidar Contraseña</h2>
              <div className="input-box">
                <label>Correo</label>
                <input
                  type="text"
                  placeholder="Correo"
                  className="field"
                  name="correo"
                  required
                />
                <label>Contraseña Actual</label>
                <input
                  type={showContraseña ? "text" : "password"}
                  className="field"
                  placeholder="Antigua Contraseña"
                  name="contraseñaantigua"
                  required
                />
                <label>Nueva Contraseña</label>
                <input
                  type={showContraseña ? "text" : "password"}
                  className="field"
                  placeholder="Nueva Contraseña"
                  name="contraseñanueva"
                  required
                />
                <div className="input-check">
                  <input
                    type="checkbox"
                    onChange={() => setShowContraseña(!showContraseña)}
                  />
                  <label>Mostrar contraseña</label>
                </div>
                <button type="submit" className="registrar-contraseña">
                  Cambiar Contraseña
                </button>
                <button type="button" onClick={() => changeForm("loging")}>
                  Volver al Inicio
                </button>
              </div>
            </form>
          </div>
        )}
*/}
        {/* Registro */}
        {currentForm === "registrar" && (
          <div className="registrar">
            <form onSubmit={handleCrear}>
              <h2>Registro de Usuario</h2>
              <label>Correo</label>
              <input
                type="text"
                placeholder="Correo"
                value={correoCrear}
                onChange={(e) => setCorreoCrear(e.target.value)}
                required
              />
              <label>Contraseña</label>
              <input
                type="password"
                placeholder="Contraseña"
                name="registrarcontraseña"
                value={contraseñaCrear}
                onChange={(e) => setContraseñaCrear(e.target.value)}
                required
              />
              <button type="submit" className="boton-registrar">
                Registrar
              </button>
              <button type="button" onClick={() => changeForm("loging")}>
                Volver al Inicio
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
