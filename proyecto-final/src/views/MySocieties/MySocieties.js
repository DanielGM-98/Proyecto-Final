import { useEffect, useContext, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
export default function MySocieties() {
  const [society, setSociety] = useState();

  const [sociedad, setSociedad] = useState(null);
  const { auth } = useAuthContext();
  const [idsociedad, setIdSociedad] = useState(1);
  const [n, setN] = useState(0);
  function handleSelect(e) {
    setIdSociedad(e.target.value);
    setN(n + 1);
  }

  //Llamar a todas las sociedades
  useEffect(
    function () {
      function callSocieties() {
        let xhttp = new XMLHttpRequest();
        let data = { id_usuario: auth.id_usuario };
        xhttp.onreadystatechange = function () {
          if (this.readyState === 4 && this.status === 200) {
            setSociety(JSON.parse(this.responseText));
          }
        };

        xhttp.open("POST", "http://localhost:8080/selectsocieties", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(data));
      }
      callSocieties();
    },
    [auth, n]
  );

  //Llama a una sociedad
  useEffect(
    function () {
      function callSociety() {
        let xhttp = new XMLHttpRequest();
        let data = { id_sociedad: idsociedad };
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
    [n]
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
      <select name="select" onChange={handleSelect}>
        {society.map((soc) => (
          <option value={soc.id_sociedad}>{soc.nombre_sociedad}</option>
        ))}
      </select>
      {sociedad ? (
        <div className="mt-4">
          <p>
            <strong>Nombre de la sociedad:</strong>{" "}
            {sociedad[0].nombre_sociedad}
          </p>
          <img src={sociedad[0].logo} />
        </div>
      ) : (
        <div className="mt-4">
          <p>Selecciona una opción</p>
        </div>
      )}
    </div>
  );
}
