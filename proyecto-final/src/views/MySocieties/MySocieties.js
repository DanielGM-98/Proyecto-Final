import { useEffect, useContext, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
export default function MySocieties() {
  const [society, setSociety] = useState(null);
  const { auth } = useAuthContext();
  useEffect(
    function () {
      function callSociety() {
        let xhttp = new XMLHttpRequest();
        let data = { id_usuario: auth.id_usuario };
        xhttp.onreadystatechange = function () {
          if (this.readyState === 4 && this.status === 200) {
            setSociety(JSON.parse(this.responseText));
          }
        };

        xhttp.open("POST", "http://localhost:8080/selectsociety", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(data));
      }
      callSociety();
      console.log(society);
    },
    [auth],
  );
  if (!society || society.length === 0)
    return (
      <div>
        <h1>Mis Sociedades</h1>

        <div>
          <p>Cargando...</p>
        </div>
      </div>
    );

  return (
    <div>
      <h1>Mis Sociedades</h1>
      {society.map((soc) => (
        <div className="mt-4">
          <p>
            <strong>Nombre de la sociedad:</strong> {soc.nombre_sociedad}
          </p>
          <p>Dirección de la sociedad: {soc.direccion_sociedad}</p>
          <p>Teléfono de la sociedad: {soc.telefono_sociedad}</p>
          <p>Email de la sociedad: {soc.email_sociedad}</p>
        </div>
      ))}
    </div>
  );
}
