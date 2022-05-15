import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function EditSociety() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [sociedad, setSociedad] = useState(null);
  const [n, setN] = useState(0);

  const [soc, setSoc] = useState({
    nombre_sociedad: "",
    direccion_sociedad: "",
    codigo_pais: "",
    telefono_sociedad: "",
    email_sociedad: "",
  });

  function updateSociety() {
    let url = "http://localhost:8080/updatesociety";

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        setN(n + 1);
      }
    };
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(sociedad));
  }

  //Actualiza los datos de la sociedad
  function handleSubmit(e) {
    e.preventDefault();
    updateSociety();
    setN(n + 1);

    Swal.fire({
      title: "Sociedad actualizada!",
      icon: "success",
      allowOutsideClick: false,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        navigate(`/sociedad/${id}`);
      }
    });
  }

  //Llamar a una sociedad
  useEffect(
    function () {
      function callSociety() {
        let xhttp = new XMLHttpRequest();
        let data = { id_sociedad: id };
        xhttp.onreadystatechange = function () {
          if (this.readyState === 4 && this.status === 200) {
            let x = JSON.parse(this.responseText);
            setSociedad(x[0]);
            setN(n + 1);
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

  function handleInputs(e) {
    setSociedad({ ...sociedad, [e.target.name]: e.target.value });
  }

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
      <div className="signin container my-4 py-5 bg-op settings-menu scroll-part rounded p-md-5">
        <section>
          {sociedad.logo !== null && (
            <img
              src={sociedad.logo}
              className="m-auto w-25"
              alt="logo-empresa"
            />
          )}
          <form onSubmit={handleSubmit}>
            <label htmlFor="nombre_sociedad">Nombre de la sociedad:</label>
            <input
              type="text"
              id="nombre_sociedad"
              name="nombre_sociedad"
              value={sociedad.nombre_sociedad}
              onChange={handleInputs}
              className="text-center"
            />
            <label htmlFor="direccion_sociedad">
              Dirección de la sociedad:
            </label>
            <input
              type="text"
              id="direccion_sociedad"
              name="direccion_sociedad"
              value={sociedad.direccion_sociedad}
              className="text-center"
              onChange={handleInputs}
            />

            <label htmlFor="codigo_pais">Código del pais de la sociedad:</label>
            <input
              type="text"
              id="codigo_pais"
              name="codigo_pais"
              value={sociedad.codigo_pais}
              className="text-center"
              onChange={handleInputs}
              max="999"
              min="1"
            />
            <label htmlFor="telefono_sociedad">Teléfono de la sociedad:</label>
            <input
              type="text"
              id="telefono_sociedad"
              name="telefono_sociedad"
              value={sociedad.telefono_sociedad}
              className="text-center"
              onChange={handleInputs}
              max="999999999"
              min="100000000"
            />
            <label htmlFor="email_sociedad">Correo electrónico:</label>
            <input
              type="text"
              id="email_sociedad"
              name="email_sociedad"
              value={sociedad.email_sociedad}
              className="text-center"
              onChange={handleInputs}
            />
            <button className="btn btn-primary link-page-button my-5 text-light">
              Actualizar Sociedad
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
