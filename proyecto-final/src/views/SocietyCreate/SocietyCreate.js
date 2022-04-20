import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { useDatabaseContext } from "../../context/DatabaseContext";
export default function SocietyCreate() {
  const { register, errorRegister } = useDatabaseContext();

  const navigate = useNavigate();
  const userRef = useRef();
  const [user, setUser] = useState({
    nombre: "",
    apellidos: "",
    email: "",
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
        <h1>Regístrate</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            ref={userRef}
            autoComplete="off"
            onChange={handleInputs}
            value={user.nombre}
            required
          />
          <label htmlFor="apellidos">Apellidos:</label>
          <input
            type="text"
            id="apellidos"
            name="apellidos"
            autoComplete="off"
            onChange={handleInputs}
            value={user.apellidos}
            required
          />
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="text"
            id="email"
            name="email"
            autoComplete="off"
            onChange={handleInputs}
            value={user.email}
            required
          />
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleInputs}
            value={user.password}
            required
          />
          <button className="btn btn-primary mt-3">Confirmar Datos</button>
        </form>
        <p>
          ¿Ya estás registrado? Inicia sesión{" "}
          <Link className="link-page" to="/login">
            aquí
          </Link>
        </p>
      </section>
    </div>
  );
}
