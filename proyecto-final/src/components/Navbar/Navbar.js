import "./Navbar.css";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAuthContext } from "../../context/AuthContext";
export default function Navbar() {
  function closeMenu() {
    document.getElementById("sidebar").classList.add("active");
    document.getElementById("dismiss").classList.add("active");
    document.getElementsByClassName("overlay")[0].classList.remove("active");
  }
  const { auth, setAuth, logout } = useAuthContext();
  return (
    <div className="wrapper">
      <nav id="sidebar" className="active">
        <div id="dismiss" className="btn btn-light" onClick={() => closeMenu()}>
          <ArrowBackIcon />
        </div>

        <div className="sidebar-header">
          <h3>Contabilidad</h3>
        </div>

        <ul className="list-unstyled components">
          <p>Menú</p>
          <li className="active">
            <Link
              data-toggle="collapse"
              aria-expanded="false"
              to="inicio"
              onClick={() => closeMenu()}
            >
              Inicio
            </Link>
          </li>
          {!auth && (
            <>
              <li>
                <Link
                  data-toggle="collapse"
                  aria-expanded="false"
                  to="registro"
                  onClick={() => closeMenu()}
                >
                  Registrarse
                </Link>
                <Link
                  data-toggle="collapse"
                  aria-expanded="false"
                  to="login"
                  onClick={() => closeMenu()}
                >
                  Iniciar Sesión
                </Link>
              </li>
            </>
          )}
          {auth && (
            <>
              <li>
                <Link
                  data-toggle="collapse"
                  aria-expanded="false"
                  to="facturas"
                  onClick={() => closeMenu()}
                >
                  Mis Facturas
                </Link>
              </li>
              <li>
                <Link
                  data-toggle="collapse"
                  aria-expanded="false"
                  to="ajustes"
                  onClick={() => closeMenu()}
                >
                  Ajustes
                </Link>
              </li>
              <li>
                <a onClick={() => logout()}>Cerrar Sesión</a>
              </li>
            </>
          )}
        </ul>
      </nav>

      <div className="overlay" onClick={() => closeMenu()}></div>
    </div>
  );
}
