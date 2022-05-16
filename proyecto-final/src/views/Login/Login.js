import { useState, useEffect, useRef } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import DoneIcon from "@mui/icons-material/Done";
import Swal from "sweetalert2";

import "./Login.css";

export default function Login() {
  const [inProp, setInProp] = useState(false);
  const { login, errorMessage, auth } = useAuthContext();

  //const location = useLocation();
  const navigate = useNavigate();
  const userRef = useRef();

  //const from = location.state?.from?.pathname || "/";
  const [user, setUser] = useState({
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
    let x = login(user);
    setUser({
      email: "",
      password: "",
    });
    if (x) {
      setInProp(true);
      /* document.getElementById("bg-login").classList.remove("d-none");
      document.getElementById("myModal").classList.add("d-block");
      document.getElementById("myModal").classList.add("show");
      document.getElementById("myModal").classList.remove("d-none"); */
      Swal.fire({
        title: "Inicio de sesión correcto",
        icon: "success",
        allowOutsideClick: false,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          navigate("/ajustes");
        }
      });
      //navigate("/ajustes");
    } else {
      navigate("/login");
    }
  }

  return (
    <div className="signin container settings-menu scroll-part rounded my-4 py-5">
      <section>
        <p
          className={errorMessage ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errorMessage}
        </p>

        <h1 className="text-light">Inicia Sesión</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="text-light">
            Correo electrónico:
          </label>
          <input
            type="text"
            id="email"
            name="email"
            ref={userRef}
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

          <button className="btn btn-primary mt-3">Iniciar Sesión</button>
        </form>
        <p className="text-light">
          ¿Aún no estás registrado? Registrate{" "}
          <Link className="link-page" to="/registro">
            aquí
          </Link>
        </p>
      </section>
    </div>
  );
}
