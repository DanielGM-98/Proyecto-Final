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
        text: "You clicked the button!",
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

  function navigateTo() {
    navigate("/ajustes");
  }
  return (
    <div className="signin">
      <section>
        <p
          className={errorMessage ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errorMessage}
        </p>

        <div id="myModal" className="modal fade">
          <div className="modal-dialog modal-confirm">
            <div className="modal-content">
              <div className="modal-header">
                <div className="icon-box">
                  <DoneIcon className="w-100 h-auto" />
                </div>
                <h4 className="modal-title w-100">Awesome!</h4>
              </div>
              <div className="modal-body">
                <p className="text-center">Inicio de sesión correcto</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-success btn-block w-100"
                  data-dismiss="modal"
                  onClick={() => navigateTo()}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop fade show d-none" id="bg-login"></div>

        <h1>Inicia Sesión</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Correo electrónico:</label>
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
          <label htmlFor="password">Contraseña:</label>
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
        <p>
          ¿Aún no estás registrado? Registrate{" "}
          <Link className="link-page" to="/registro">
            aquí
          </Link>
        </p>
      </section>
    </div>
  );
}
