import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useDatabaseContext } from "../../context/DatabaseContext";
export default function UserUpdate() {
  const { updateUser, success } = useDatabaseContext();
  const { auth, setAuth } = useAuthContext();
  const [errorMsg, setErrorMsg] = useState("");
  const [authCopy, setAuthCopy] = useState(auth);

  const userRef = useRef();

  const [user, setUser] = useState({
    id_usuario: auth.id_usuario,
    nombre: auth.nombre,
    apellidos: auth.apellidos,
    password: auth.password,
  });

  useEffect(function () {
    return userRef.current.focus();
  }, []);

  function handleInputs(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.table(user);
    updateUser(user);
    setAuth({
      id_usuario: authCopy.id_usuario,
      nombre: user.nombre,
      apellidos: user.apellidos,
      password: user.password,
      confirmado: authCopy.confirmado,
      email: authCopy.email,
    });
  }
  return (
    <div className="signin p-md-5">
      <section>
        <p className={errorMsg ? "errmsg" : "offscreen"} aria-live="assertive">
          {errorMsg}
        </p>
        <h1>Editar datos del usuario</h1>
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
      </section>
    </div>
  );
}
