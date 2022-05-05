import { useState, useEffect, useRef } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import DoneIcon from "@mui/icons-material/Done";
import "./Login.css";

export default function Login() {
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
      document.getElementById("myModal").classList.remove("d-none");
      document.getElementById("myModal").classList.add("show");
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

        <div id="myModal" className="modal fade d-none">
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
