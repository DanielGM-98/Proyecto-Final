import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

export default function MySocieties() {
  const { auth } = useAuthContext();
  const [society, setSociety] = useState();
  const [n, setN] = useState(0);

  function deleteSociety(id) {
    let xhttp = new XMLHttpRequest();
    let data = { id_sociedad: id };

    Swal.fire({
      title: "¿Estas seguro de querer eliminar esta sociedad?",
      text: "Esta acción es irreversible",
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
          text: "La sociedad ha sido eliminada con éxito",
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

            xhttp.open("POST", "http://localhost:8080/deletesociety", true);
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.send(JSON.stringify(data));
          }
        });
      }
    });
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

  //Llama a una sociedad

  if (!society)
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
      <div className="text-light">
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
    <div className="p-md-5">
      <h1>Mis Sociedades</h1>
      <div className="container mt-5 ">
        <table className="table text-light">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Nombre Sociedad</th>
              <th scope="col">Email Sociedad</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {society.map((obj) => (
              <tr key={obj.id_sociedad}>
                <td>{obj.nombre_sociedad}</td>
                <td>{obj.email_sociedad}</td>
                <td>
                  <Link
                    className="btn btn-primary btn-sm mx-2"
                    to={`/sociedad/${obj.id_sociedad}`}
                  >
                    <EditIcon />
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteSociety(obj.id_sociedad)}
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
