import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useDatabaseContext } from "../../context/DatabaseContext";
import { v4 as uuidv4 } from "uuid";
export default function CreateInvoice() {
  const [society, setSociety] = useState(null);
  const [n, setN] = useState(0);
  const [sociedad, setSociedad] = useState(null);
  const [idsociedad, setIdSociedad] = useState(1);
  const { registerInvoice } = useDatabaseContext();
  const { auth } = useAuthContext();

  const navigate = useNavigate();
  const userRef = useRef();

  //Datos de los conceptos que se almacena hasta hacer click
  const [data, setData] = useState({
    descripcion: "",
    cantidad: "",
    precio: "",
    iva: "1.04",
  });

  //Funciones para hacer desaparecer los elementos anteriores y hacer aparecer los nuevos
  function next1() {
    document.getElementById("element1").classList.add("d-none");
    document.getElementById("element3").classList.remove("d-none");
    document.getElementById("element3").classList.add("d-flex");
    document.getElementById("element3").classList.add("justify-content-around");
  }

  function next2() {
    document.getElementById("element3").classList.add("d-none");
    document.getElementById("element4").classList.remove("d-none");
  }

  function next3() {
    document.getElementById("element4").classList.add("d-none");
    document.getElementById("element2").classList.remove("d-none");
  }

  function handleDatos(e) {
    e.preventDefault();
    company.datos.push(data);
    setN(n + 1);
    document.getElementById("descripcion").value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById("precio").value = "";
  }

  function handleData(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function handleInputs(e) {
    setCompany({ ...company, [e.target.name]: e.target.value });
    setN(n + 1);
  }

  function handleSubmit(e) {
    e.preventDefault();
    company.logo = sociedad[0].logo;
    company.nombre_sociedad = sociedad[0].nombre_sociedad;
    company.id_sociedad = sociedad[0].id_sociedad;
    registerInvoice(company);
    console.log(company);
    navigate("/facturas");
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
    [n, idsociedad],
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
    id_sociedad: "",
    numero_tarjeta: "",
    forma_pago: "efectivo",
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
      <div id="element1">
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

        <button onClick={() => next1()} className="btn btn-primary mt-3">
          Siguiente
        </button>
      </div>

      <div className="signin d-none" id="element2">
        <section>
          <h3 className="mt-3">Introduzca los datos de la empresa: </h3>
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

            <label htmlFor="date">Fecha de la operación:</label>
            <input
              type="date"
              id="date"
              name="date"
              onChange={handleInputs}
              value={company.date}
              required
            />

            <button className="btn btn-primary mt-3">Confirmar Datos</button>
          </form>
        </section>
      </div>

      <div className="signin d-none" id="element3">
        <div>
          <h3 className="mt-3">Datos de la operación: </h3>
          <form onSubmit={handleDatos}>
            <label htmlFor="descripcion">Concepto:</label>
            <input
              type="text"
              id="descripcion"
              name="descripcion"
              autoComplete="off"
              onChange={handleData}
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
            <label htmlFor="precio">IVA:</label>
            <select name="iva" id="iva" onChange={handleData}>
              <option value="1.04">4%</option>
              <option value="1.1">10%</option>
              <option value="1.21">21%</option>
            </select>

            <button className="btn btn-primary mt-3">Añadir elemento</button>
          </form>
        </div>
        <div>
          {company.datos.length > 0 ? (
            <>
              <table className="table ">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Producto</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Precio(sin IVA)</th>
                    <th scope="col">Precio(con IVA)</th>
                  </tr>
                </thead>
                <tbody>
                  {company.datos.map((obj) => (
                    <tr>
                      <td>{obj.descripcion}</td>
                      <td>{obj.cantidad}</td>
                      <td>{obj.precio}</td>
                      <td>{obj.precio * Number(obj.iva)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="btn btn-primary mt-3" onClick={() => next2()}>
                Siguiente
              </button>
            </>
          ) : (
            <div>Añade algo para continuar</div>
          )}
        </div>
      </div>

      <div className="signin d-none" id="element4">
        <div>
          <h3 className="mt-3">Método de pago: </h3>
          <form>
            <label htmlFor="forma_pago">Forma de pago:</label>
            <select name="forma_pago" onChange={handleInputs} required>
              <option value="efectivo">Efectivo</option>
              <option value="tarjeta">Tarjeta</option>
            </select>
            {company.forma_pago === "tarjeta" && (
              <>
                <label htmlFor="cantidad">Número de la tarjeta:</label>
                <input
                  type="number"
                  id="numero_tarjeta"
                  name="numero_tarjeta"
                  autoComplete="off"
                  onChange={handleInputs}
                  required
                />
              </>
            )}
          </form>
          <button className="btn btn-primary mt-3" onClick={() => next3()}>
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
