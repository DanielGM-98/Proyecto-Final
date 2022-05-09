import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EditSociety() {
  const { id } = useParams();
  const [sociedad, setSociedad] = useState(null);
  //Llamar a una sociedad
  useEffect(
    function () {
      function callSociety() {
        let xhttp = new XMLHttpRequest();
        let data = { id_sociedad: id };
        xhttp.onreadystatechange = function () {
          if (this.readyState === 4 && this.status === 200) {
            setSociedad(JSON.parse(this.responseText));
          }
        };

        xhttp.open("POST", "http://localhost:8080/selectsociety", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(data));
      }
      callSociety();
    },
    [id],
  );

  if (!sociedad) {
    return (
      <div>
        <h1>Cargando...</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>Editar Sociedad</h1>
      <div className="signin">
        <section>
          {sociedad[0].logo !== null && (
            <img
              src={sociedad[0].logo}
              className="m-auto w-25"
              alt="logo-empresa"
            />
          )}
          <form>
            <label htmlFor="nombre">Nombre de la sociedad:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={sociedad[0].nombre_sociedad}
              readOnly
              className="text-center"
            />
            <label htmlFor="direccion">Dirección de la sociedad:</label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={sociedad[0].direccion_sociedad}
              readOnly
              className="text-center"
            />
            <label htmlFor="telefono">Teléfono de la sociedad:</label>
            <input
              type="text"
              id="telefono"
              name="telefono"
              value={
                "+" +
                sociedad[0].codigo_pais +
                " " +
                sociedad[0].telefono_sociedad
              }
              readOnly
              className="text-center"
            />
            <label htmlFor="email">Correo electrónico:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={sociedad[0].email_sociedad}
              readOnly
              className="text-center"
            />
          </form>
          <Link
            to="/editarusuario"
            className="btn btn-outline-primary link-page-button"
          >
            Editar Sociedad
          </Link>
        </section>
      </div>
    </div>
  );
}
