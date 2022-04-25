import { useEffect, useContext, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useDatabaseContext } from "../../context/DatabaseContext";
import { v4 as uuidv4 } from "uuid";
export default function CreateInvoice() {
  const [society, setSociety] = useState(null);

  const [sociedad, setSociedad] = useState(null);
  const { auth } = useAuthContext();
  const [idsociedad, setIdSociedad] = useState(1);
  const [n, setN] = useState(0);

  const navigate = useNavigate();
  const userRef = useRef();

  const [data, setData] = useState({
    descripcion: "",
    cantidad: "",
    precio: "",
  });

  function handleDatos(e) {
    e.preventDefault();
    company.datos.push(data);
    console.log(data);
    console.log(company);
    document.getElementById("descripcion").value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById("precio").value = "";
  }

  function handleData(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function handleInputs(e) {
    setCompany({ ...company, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    company.logo = sociedad[0].logo;
    company.nombre_sociedad = sociedad[0].nombre_sociedad;
    console.log(company);
    //register(company);

    //navigate(from, { replace: true });
  }
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

  const [company, setCompany] = useState({
    id: uuidv4(),
    nombre_empresa: "",
    direccion_empresa: "",
    email: "",
    codigo_pais: "",
    telefono_company: "",
    date: "",
    datos: [],
    nombre_sociedad: "",
    logo: "",
  });

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
          <option value={soc.id_sociedad} key={soc.id_sociedad}>
            {soc.nombre_sociedad}
          </option>
        ))}
      </select>

      <h3 className="mt-3">Introduzca los datos de la empresa: </h3>
      <div className="signin">
        <section>
          {/* <p
            className={errorRegister ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errorRegister}
          </p> */}
          <form onSubmit={handleSubmit}>
            <p>Datos de la empresa</p>
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
            <label htmlFor="codigo_pais">Código del país:</label>
            <input
              type="number"
              id="codigo_pais"
              max="999"
              min="1"
              name="codigo_pais"
              onChange={handleInputs}
              value={company.codigo_pais}
              required
            />
            <label htmlFor="telefono_company">Teléfono de la empresa:</label>
            <input
              type="number"
              id="telefono_company"
              name="telefono_company"
              onChange={handleInputs}
              value={company.telefono_company}
              required
            />
            <p>Datos de la transacción</p>

            <button className="btn btn-primary mt-3">Confirmar Datos</button>
          </form>
          <form onSubmit={handleDatos}>
            <label htmlFor="date">Fecha de la transacción:</label>
            <input
              type="date"
              id="date"
              name="date"
              onChange={handleInputs}
              value={company.date}
              required
            />
            <label htmlFor="descripcion">Descripción del elemento:</label>
            <input
              type="text"
              id="descripcion"
              name="descripcion"
              autoComplete="off"
              onChange={handleData}
              value={data.descripcion}
              required
            />
            <label htmlFor="cantidad">Cantidad:</label>
            <input
              type="number"
              id="cantidad"
              name="cantidad"
              autoComplete="off"
              onChange={handleData}
              required
            />
            <label htmlFor="precio">Precio:</label>
            <input
              type="number"
              id="precio"
              name="precio"
              autoComplete="off"
              onChange={handleData}
              required
            />
            <button className="btn btn-primary mt-3">Añadir elemento</button>
          </form>
        </section>
      </div>
    </div>
  );
}
