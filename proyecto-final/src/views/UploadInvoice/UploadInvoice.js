import { useAuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";

export default function UploadInvoice() {
  const { auth } = useAuthContext();
  const navigate = useNavigate();
  const [society, setSociety] = useState(null);
  const [n, setN] = useState(0);
  const [sociedad, setSociedad] = useState(null);
  const [idsociedad, setIdSociedad] = useState(1);

  const [factura, setFactura] = useState({
    id_sociedad: "",
    factura: "",
  });

  useEffect(
    function () {
      function callSocieties() {
        let xhttp = new XMLHttpRequest();
        let data = { id_usuario: auth.id_usuario };
        xhttp.onreadystatechange = function () {
          if (this.readyState === 4 && this.status === 200) {
            setSociety(JSON.parse(this.responseText));
            setN(n + 1);
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

  function handleInputs(e) {
    setFactura({ ...factura, [e.target.name]: e.target.value });
    setN(n + 1);
  }

  function handleSelect(e) {
    setIdSociedad(e.target.value);
    setN(n + 1);
  }

  useEffect(
    function () {
      function callSociety() {
        let xhttp = new XMLHttpRequest();
        let data = { id_sociedad: idsociedad };
        xhttp.onreadystatechange = function () {
          if (this.readyState === 4 && this.status === 200) {
            setSociedad(JSON.parse(this.responseText));
            setN(n + 1);
          }
        };

        xhttp.open("POST", "http://localhost:8080/selectsociety", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(data));
      }
      callSociety();
    },
    [n, idsociedad],
  );

  function handleSubmit(e) {
    e.preventDefault();
    setN(n + 1);
    factura.id_sociedad = sociedad[0].id_sociedad;

    Swal.fire({
      title: "Factura insertada!",
      icon: "success",
      allowOutsideClick: false,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        let xhttp = new XMLHttpRequest();
        let data = factura;
        xhttp.onreadystatechange = function () {
          if (this.readyState === 4 && this.status === 200) {
            navigate("/inicio");
            navigate("/ajustes");
          }
        };

        xhttp.open("POST", "http://localhost:8080/uploadinvoice", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(data));
      }
    });
  }
  if (!society)
    return (
      <div>
        <h1>Mis Sociedades</h1>
        <div>
          <p>Cargando...</p>
        </div>
      </div>
    );

  if (!sociedad)
    return (
      <div>
        <h1>Mis Sociedades</h1>
        <div>
          <p>Cargando...</p>
        </div>
      </div>
    );

  if (society.length === 0) {
    return (
      <div>
        <h1>Crear Factura</h1>
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
      <h1>Crear Factura</h1>
      <br />
      <div
        id="element1"
        className="container my-4 py-5 bg-op settings-menu scroll-part rounded"
      >
        <h3>
          Seleccione una sociedad:{" "}
          <select name="select" onChange={handleSelect}>
            {society.map((soc) => (
              <option value={soc.id_sociedad} key={soc.id_sociedad}>
                {soc.nombre_sociedad}
              </option>
            ))}
          </select>
        </h3>
        <section className="m-auto">
          <form onSubmit={handleSubmit}>
            <label htmlFor="icono_sociedad">
              Sube la factura para guardarla:
            </label>
            <input
              type="file"
              id="icono_empresa"
              name="factura"
              accept="application/pdf"
              onChange={handleInputs}
              required
            />
            <button className="btn btn-primary mt-3">Subir archivo</button>
          </form>
        </section>
      </div>
    </div>
  );
}
