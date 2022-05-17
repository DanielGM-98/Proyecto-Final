import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDatabaseContext } from "../../context/DatabaseContext";
export default function Register() {
  const { register, errorRegister } = useDatabaseContext();

  const userRef = useRef();
  const [n, setN] = useState(0);

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
    setN(n + 1);
    register(user);
    console.log(errorRegister);
  }
  return (
    <div className="signin container settings-menu scroll-part rounded my-4 py-5">
      <section>
        <p
          className={errorRegister ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errorRegister}
        </p>
        <h1 className="text-light">Regístrate</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre" className="text-light">
            Nombre:
          </label>
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
          <label htmlFor="apellidos" className="text-light">
            Apellidos:
          </label>
          <input
            type="text"
            id="apellidos"
            name="apellidos"
            autoComplete="off"
            onChange={handleInputs}
            value={user.apellidos}
            required
          />
          <label htmlFor="email" className="text-light">
            Correo electrónico:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="off"
            onChange={handleInputs}
            value={user.email}
            required
          />
          <label htmlFor="password" className="text-light">
            Contraseña:
          </label>
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
        <p className="text-light">
          ¿Ya estás registrado? Inicia sesión{" "}
          <Link className="link-page" to="/login">
            aquí
          </Link>
        </p>
      </section>
    </div>
  );
}
