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
  const { auth, logout } = useAuthContext();

  return (
    <div className="wrapper">
      <nav id="sidebar" className="active">
        <div className="sidebar-header">
          <h3>Contabilidad</h3>
          <button
            id="dismiss"
            className="btn btn-light"
            onClick={() => closeMenu()}
          >
            <ArrowBackIcon />
          </button>
        </div>

        <ul className="list-unstyled components">
          <p>{auth ? <>Bienvenido de nuevo, {auth.nombre}</> : <>Menú</>}</p>
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
                  to="crearfactura"
                  onClick={() => closeMenu()}
                >
                  Crear Factura
                </Link>
              </li>
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
                  to="uploadinvoice"
                  onClick={() => closeMenu()}
                >
                  Subir factura
                </Link>
              </li>
              <li>
                <Link
                  data-toggle="collapse"
                  aria-expanded="false"
                  to="uploadedinvoices"
                  onClick={() => closeMenu()}
                >
                  Facturas subidas
                </Link>
              </li>
              <li>
                <Link
                  data-toggle="collapse"
                  aria-expanded="false"
                  to="ajustes"
                  onClick={() => closeMenu()}
                >
                  Panel de Control
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
