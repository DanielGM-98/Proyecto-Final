import "./Navbar.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
export default function Navbar() {
  function closeMenu() {
    document.getElementById("sidebar").classList.add("active");
    document.getElementById("dismiss").classList.add("active");
    document.getElementsByClassName("overlay")[0].classList.remove("active");
  }
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
            <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false">
              Inicio
            </a>
          </li>
          <li>
            <a href="#">Registrarse</a>
            <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false">
              Iniciar Sesión
            </a>
          </li>
          <li>
            <a href="#">Mis facturas</a>
          </li>
          <li>
            <a href="#">Ajustes</a>
          </li>
          <li>
            <a href="#">Cerrar Sesión</a>
          </li>
        </ul>
      </nav>

      <div className="overlay" onClick={() => closeMenu()}></div>
    </div>
  );
}
