import { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Facturas() {
  const [society, setSociety] = useState(null);
  const [n, setN] = useState(0);
  const [sociedad, setSociedad] = useState(null);
  const [idsociedad, setIdSociedad] = useState(1);
  const [facturas, setFacturas] = useState([]);
  const { auth } = useAuthContext();

  function handleSelect(e) {
    setIdSociedad(e.target.value);
    console.log(sociedad);
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
    [auth, n],
  );

  //Llamar a una sociedad
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
    [n],
  );

  //Llamar a todas las facturas del usuario

  useEffect(
    function () {
      function callFacturas() {
        let xhttp = new XMLHttpRequest();
        let data = { id_sociedad: idsociedad };
        xhttp.onreadystatechange = function () {
          if (this.readyState === 4 && this.status === 200) {
            setFacturas(JSON.parse(this.responseText));
          }
        };

        xhttp.open("POST", "http://localhost:8080/selectinvoices", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(data));
      }
      callFacturas();
    },
    [auth, n],
  );

  if (!society || !sociedad || !facturas) {
    return (
      <div>
        <h1>Mis Sociedades</h1>
        <div>
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  if (society.length === 0) {
    return (
      <div>
        <h1>Mis Sociedades</h1>
        <div>
          <p>Aún no has añadido ninguna sociedad</p>
          <p>
            Para poder utilizar la aplicación es necesario registrar al menos
            una sociedad
          </p>
          <p>
            Para añadir una sociedad pulsa{" "}
            <Link className="link-page" to="/creasociedad">
              aquí
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Mis facturas</h1>
      <h3>Seleccione una sociedad:</h3>
      <select name="select" onChange={handleSelect}>
        {society.map((soc) => (
          <option value={soc.id_sociedad} key={soc.id_sociedad}>
            {soc.nombre_sociedad}
          </option>
        ))}
      </select>
      <div>
        {facturas.map((factura) => (
          <p>{factura.nombre_empresa}</p>
        ))}
      </div>
    </div>
  );
}
