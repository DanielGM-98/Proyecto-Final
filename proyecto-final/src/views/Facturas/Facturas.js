import { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import missing from "../images/missing.png";
import Swal from "sweetalert2";

export default function Facturas() {
  const [society, setSociety] = useState(null);
  const [n, setN] = useState(0);
  const [sociedad, setSociedad] = useState(null);
  const [idsociedad, setIdSociedad] = useState(1);
  const [facturas, setFacturas] = useState([]);
  const { auth } = useAuthContext();

  function deleteInvoice(id) {
    let xhttp = new XMLHttpRequest();
    let data = { id_factura: id };
    Swal.fire({
      title: "¿Estas seguro de querer eliminar esta factura?",
      text: "No podrás volver atrás",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Eliminado!",
          text: "La factura ha sido eliminada con éxito",
          icon: "success",
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            xhttp.onreadystatechange = function () {
              if (this.readyState === 4 && this.status === 200) {
                console.log(this.responseText);
                setN(n + 1);
              }
            };

            xhttp.open("POST", "http://localhost:8080/deleteinvoice", true);
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.send(JSON.stringify(data));
          }
        });
      }
    });
  }

  function handleSelect(e) {
    setIdSociedad(e.target.value);
    //console.log(facturas);
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
    [n, idsociedad],
  );

  //Llamar a todas las facturas del usuario

  useEffect(
    function () {
      function callFacturas() {
        let xhttp = new XMLHttpRequest();
        let data = { id_sociedad: idsociedad };
        xhttp.onreadystatechange = function () {
          if (this.readyState === 4 && this.status === 200) {
            let x = JSON.parse(this.responseText);
            let j = [];

            for (let y of x) {
              let h = JSON.parse(y.datos);
              j = [];
              for (let z of h) {
                j.push(z);
                y.datos = j;
              }
            }
            setFacturas(x);
          }
        };

        xhttp.open("POST", "http://localhost:8080/selectinvoices", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(data));
      }
      callFacturas();
    },
    [auth, n, idsociedad],
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
        <h1>Mis Facturas</h1>
        <div>
          <img src={missing} />
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

      <div>
        {facturas.length === 0 ? (
          <div className="container bg-op settings-menu scroll-part rounded my-4 py-5">
            <h3>Seleccione una sociedad:</h3>
            <select name="select  " onChange={handleSelect}>
              {society.map((soc) => (
                <option value={soc.id_sociedad} key={soc.id_sociedad}>
                  {soc.nombre_sociedad}
                </option>
              ))}
            </select>
            <br />
            <img src={missing} />
            <p className="text-light py-4">
              No has creado ninguna factura. Para poder mostrar las facturas es
              necesario haber creado alguna.
            </p>
            <p className="text-light">
              Para crear una factura pulsa{" "}
              <Link to="/crearfactura" className="link-page">
                aquí
              </Link>
            </p>
          </div>
        ) : (
          <div className="container my-4 py-5 bg-op settings-menu scroll-part rounded p-md-5">
            <h3>Seleccione una sociedad:</h3>
            <select name="select  " onChange={handleSelect}>
              {society.map((soc) => (
                <option value={soc.id_sociedad} key={soc.id_sociedad}>
                  {soc.nombre_sociedad}
                </option>
              ))}
            </select>
            <table className="table ">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Nombre empresa</th>
                  <th scope="col">Fecha Creación</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {facturas.map((obj) => (
                  <tr key={obj.id_factura}>
                    <td>{obj.nombre_empresa}</td>
                    <td>{obj.date}</td>
                    <td>
                      <Link
                        className="btn btn-primary btn-sm mx-2"
                        to={`/factura/${obj.id_factura}`}
                      >
                        <EditIcon />
                      </Link>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteInvoice(obj.id_factura)}
                      >
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
