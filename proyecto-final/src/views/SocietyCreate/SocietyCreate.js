import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { useDatabaseContext } from "../../context/DatabaseContext";
import { useAuthContext } from "../../context/AuthContext";
export default function SocietyCreate() {
  const { errorRegister, registerSociety } = useDatabaseContext();
  const { auth } = useAuthContext();

  const navigate = useNavigate();
  const userRef = useRef();
  const [sociedad, setSociedad] = useState({
    id_usuario: auth.id_usuario,
    nombre_sociedad: "",
    direccion_sociedad: "",
    email_sociedad: "",
    telefono_sociedad: "",
    icono_empresa: "",
  });

  useEffect(function () {
    return userRef.current.focus();
  }, []);

  function handleInputs(e) {
    setSociedad({ ...sociedad, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    //registerSociety(sociedad);
    console.log(sociedad);
    navigate("/ajustes");
  }
  return (
    <div className="signin">
      <section>
        <p
          className={errorRegister ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errorRegister}
        </p>
        <h1>Añadir nueva Sociedad</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre de la sociedad:</label>
          <input
            type="text"
            id="nombre"
            name="nombre_sociedad"
            ref={userRef}
            autoComplete="off"
            onChange={handleInputs}
            value={sociedad.nombre_sociedad}
            required
          />
          <label htmlFor="direccion_sociedad">Dirección de la sociedad:</label>
          <input
            type="text"
            id="direccion_sociedad"
            name="direccion_sociedad"
            autoComplete="off"
            onChange={handleInputs}
            value={sociedad.direccion_sociedad}
            required
          />
          <label htmlFor="email">Correo electrónico de la sociedad:</label>
          <input
            type="text"
            id="email_sociedad"
            name="email_sociedad"
            autoComplete="off"
            onChange={handleInputs}
            value={sociedad.email_sociedad}
            required
          />
          <label htmlFor="telefono_sociedad">Teléfono de la sociedad:</label>
          <input
            type="number"
            id="telefono_sociedad"
            name="telefono_sociedad"
            onChange={handleInputs}
            value={sociedad.telefono_sociedad}
            required
          />
          <label htmlFor="icono_sociedad">Imagen de la sociedad:</label>
          <input
            type="file"
            id="icono_empresa"
            name="icono_empresa"
            accept="image/png, image/jpeg"
            onChange={handleInputs}
            required
          />
          <button className="btn btn-primary mt-3">Confirmar Datos</button>
        </form>
      </section>
    </div>
  );
}
