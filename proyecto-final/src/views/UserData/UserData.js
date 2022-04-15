import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import "./UserData.css";
export default function UserData() {
  const { auth } = useAuthContext();
  return (
    <div>
      <h1>Datos del usuario</h1>
      <div className="signin">
        <section>
          <form>
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={auth.nombre}
              readOnly
              className="text-center"
            />
            <label htmlFor="apellidos">Apellidos:</label>
            <input
              type="text"
              id="apellidos"
              name="apellidos"
              value={auth.apellidos}
              readOnly
              className="text-center"
            />
            <label htmlFor="email">Correo electrónico:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={auth.email}
              readOnly
              className="text-center"
            />
          </form>
          <Link
            to="/editarusuario"
            className="btn btn-outline-primary link-page-button"
          >
            Editar usuario
          </Link>
        </section>
      </div>
    </div>
  );
}
