import { Link } from "react-router-dom";

export default function Settings() {
  return (
    <div>
      <h1>Panel de Control</h1>
      <div className="d-flex justify-content-around">
        <div>
          <h3>Ajustes de usuario</h3>
          <p>
            <Link to="/userdata" className="link-page">
              Mis datos
            </Link>
          </p>
          <p>
            <Link to="/editarusuario" className="link-page">
              Editar datos del usuario
            </Link>
          </p>
        </div>
        <div>
          <h3>Ajustes de sociedades</h3>
          <p>
            <Link to="/creasociedad" className="link-page">
              Añadir nueva sociedad
            </Link>
          </p>
          <p>
            <Link to="/missociedades" className="link-page">
              Mis sociedades
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
