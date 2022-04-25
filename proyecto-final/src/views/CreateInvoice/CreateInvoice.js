import { useEffect, useContext, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useDatabaseContext } from "../../context/DatabaseContext";
export default function CreateInvoice() {
  const [society, setSociety] = useState();

  const [sociedad, setSociedad] = useState(null);
  const { auth } = useAuthContext();
  const [idsociedad, setIdSociedad] = useState(1);
  const [n, setN] = useState(0);

  const { register, errorRegister } = useDatabaseContext();
  const location = useLocation();
  const navigate = useNavigate();
  const userRef = useRef();

  const from = location.state?.from?.pathname || "/";
  const [company, setCompany] = useState({
    nombre_empresa: "",
    direccion_empresa: "",
    email: "",
    state_empresa: "",
  });

  function handleInputs(e) {
    setCompany({ ...company, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    //register(company);

    navigate(from, { replace: true });
  }
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
    [auth, n],
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
    [n],
  );

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
      <h1>Crear Factura</h1>
      <br />
      <h3>Seleccione una sociedad:</h3>
      <select name="select" onChange={handleSelect}>
        {society.map((soc) => (
          <option value={soc.id_sociedad}>{soc.nombre_sociedad}</option>
        ))}
      </select>

      <div className="signin">
        <section>
          {/* <p
            className={errorRegister ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errorRegister}
          </p> */}
          <h3>Introduzca los datos de la empresa: </h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="nombre">Nombre de la empresa:</label>
            <input
              type="text"
              id="nombre"
              name="nombre_empresa"
              ref={userRef}
              autoComplete="off"
              onChange={handleInputs}
              value={company.nombre_empresa}
              required
            />
            <label htmlFor="direccion">Dirección de la empresa:</label>
            <input
              type="text"
              id="direccion"
              name="direccion_empresa"
              autoComplete="off"
              onChange={handleInputs}
              value={company.direccion_empresa}
              required
            />
            <label htmlFor="state">Estado de la empresa:</label>
            <input
              type="text"
              id="state"
              name="state_empresa"
              onChange={handleInputs}
              value={company.state_empresa}
              required
            />
            <label htmlFor="email">Correo electrónico:</label>
            <input
              type="text"
              id="email"
              name="email"
              autoComplete="off"
              onChange={handleInputs}
              value={company.email}
              required
            />

            <button className="btn btn-primary mt-3">Confirmar Datos</button>
          </form>
        </section>
      </div>
    </div>
  );
}
