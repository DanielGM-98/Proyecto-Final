import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

import { useDatabaseContext } from "../../context/DatabaseContext";
import { useAuthContext } from "../../context/AuthContext";
export default function SocietyCreate() {
  const { errorRegister, registerSociety } = useDatabaseContext();
  const { auth } = useAuthContext();

  const [n, setN] = useState(0);
  const navigate = useNavigate();
  const userRef = useRef();
  const [sociedad, setSociedad] = useState({
    id_usuario: auth.id_usuario,
    nombre_sociedad: "",
    direccion_sociedad: "",
    email_sociedad: "",
    telefono_sociedad: "",
    icono_empresa: "",
    codigo_pais: "",
    cif: "",
  });

  useEffect(function () {
    return userRef.current.focus();
  }, []);

  function handleInputs(e) {
    setSociedad({ ...sociedad, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    registerSociety(sociedad);
    setN(n + 1);
    console.log(sociedad);
    Swal.fire({
      title: "Sociedad insertada!",
      icon: "success",
      allowOutsideClick: false,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        navigate("/inicio");
        navigate("/ajustes");
      }
    });
    //navigate("/ajustes");
  }
  return (
    <div className="signin">
      <section>
        <p
          className={errorRegister ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errorRegister}
        </p>
        <h1>Añadir nueva Sociedad</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre de la sociedad:</label>
          <input
            type="text"
            id="nombre"
            name="nombre_sociedad"
            ref={userRef}
            autoComplete="off"
            onChange={handleInputs}
            value={sociedad.nombre_sociedad}
            required
          />
          <label htmlFor="direccion_sociedad">Dirección de la sociedad:</label>
          <input
            type="text"
            id="direccion_sociedad"
            name="direccion_sociedad"
            autoComplete="off"
            onChange={handleInputs}
            value={sociedad.direccion_sociedad}
            required
          />
          <label htmlFor="email">Correo electrónico de la sociedad:</label>
          <input
            type="text"
            id="email_sociedad"
            name="email_sociedad"
            autoComplete="off"
            onChange={handleInputs}
            value={sociedad.email_sociedad}
            required
          />
          <label htmlFor="telefono_sociedad">Código del país:</label>
          <input
            type="number"
            id="codigo_pais"
            max="999"
            min="1"
            name="codigo_pais"
            onChange={handleInputs}
            value={sociedad.codigo_pais}
            required
          />
          <label htmlFor="telefono_sociedad">Teléfono de la sociedad:</label>
          <input
            type="number"
            id="telefono_sociedad"
            name="telefono_sociedad"
            onChange={handleInputs}
            value={sociedad.telefono_sociedad}
            required
          />

          <label htmlFor="cif">Código de Identificación Fiscal:</label>
          <input
            type="text"
            id="cif"
            name="cif"
            autoComplete="off"
            onChange={handleInputs}
            value={sociedad.cif}
            pattern="[A-B]+[-]+[0-9]{8}"
            required
          />

          <label htmlFor="icono_sociedad">Imagen de la sociedad:</label>
          <input
            type="file"
            id="icono_empresa"
            name="icono_empresa"
            accept="image/png, image/jpeg"
            onChange={handleInputs}
            required
          />
          <button className="btn btn-primary mt-3">Confirmar Datos</button>
        </form>
      </section>
    </div>
  );
}
