import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { useDatabaseContext } from "../../context/DatabaseContext";
export default function SocietyCreate() {
  const { register, errorRegister } = useDatabaseContext();

  const navigate = useNavigate();
  const userRef = useRef();
  const [user, setUser] = useState({
    nombre_sociedad: "",
    direccion_sociedad: "",
    email_sociedad: "",
    password: "",
  });

  useEffect(function () {
    return userRef.current.focus();
  }, []);

  function handleInputs(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    register(user);

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
            value={user.nombre_sociedad}
            required
          />
          <label htmlFor="direccion_sociedad">Dirección de la sociedad:</label>
          <input
            type="text"
            id="direccion_sociedad"
            name="direccion_sociedad"
            autoComplete="off"
            onChange={handleInputs}
            value={user.direccion_sociedad}
            required
          />
          <label htmlFor="email">Correo electrónico de la sociedad:</label>
          <input
            type="text"
            id="email_sociedad"
            name="email_sociedad"
            autoComplete="off"
            onChange={handleInputs}
            value={user.email_sociedad}
            required
          />
          <label htmlFor="telefono_sociedad">Teléfono de la sociedad:</label>
          <input
            type="number"
            id="telefono_sociedad"
            name="telefono_sociedad"
            onChange={handleInputs}
            value={user.telefono_sociedad}
            required
          />
          <button className="btn btn-primary mt-3">Confirmar Datos</button>
        </form>
      </section>
    </div>
  );
}
