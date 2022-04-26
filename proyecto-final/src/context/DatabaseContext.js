import { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "./AuthContext";
const DatabaseContext = createContext({
  users: [],
  setUsers: () => {},
  register: () => {},
  updateUser: () => {},
  errorRegister: "",
  registerSociety: () => {},
  society: [],
  registerInvoice: () => {},
});

export const useDatabaseContext = () => {
  return useContext(DatabaseContext);
};

export default function DatabaseContextProvider({ children }) {
  const { auth } = useAuthContext();
  const [users, setUsers] = useState(null);
  const [act, setAct] = useState(0);
  const [errorRegister, setErrorRegister] = useState("");
  const [errorRegisterSociety, setErrorRegisterSociety] = useState("");
  const [society, setSociety] = useState(null);

  useEffect(
    function () {
      function callUsers() {
        let xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
          if (this.readyState === 4 && this.status === 200) {
            setUsers(JSON.parse(this.responseText));
          }
        };

        xhttp.open("GET", "http://localhost:8080/users", true);
        xhttp.send();
      }
      callUsers();
    },
    [act],
  );

  useEffect(
    function () {
      function callSociety() {
        let xhttp = new XMLHttpRequest();
        let data = { id_usuario: auth.id_usuario };
        xhttp.onreadystatechange = function () {
          if (this.readyState === 4 && this.status === 200) {
            setSociety(JSON.parse(this.responseText));
          }
        };

        xhttp.open("POST", "http://localhost:8080/selectsociety", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(data));
      }
      callSociety();
    },
    [auth],
  );

  function updateUser(data) {
    let url = "http://localhost:8080/updateuser";

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        setAct(act + 1);
      }
    };
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(data));
  }

  //Función para registrar un usuario
  function register(data) {
    let url = "http://localhost:8080/insertuser";

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        if (
          this.responseText ===
          `Error:ER_DUP_ENTRY: Duplicate entry '${data.email}' for key 'email_UNIQUE'`
        ) {
          setErrorRegister("Error: Ya existe un usuario con ese email");
        } else {
          setErrorRegister("");
        }
        setAct(act + 1);
      }
    };
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(data));
  }

  //Función para registrar una sociedad
  function registerSociety(data) {
    let url = "http://localhost:8080/insertsociety";

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        if (
          this.responseText ===
          `Error:ER_DUP_ENTRY: Duplicate entry '${data.email}' for key 'email_UNIQUE'`
        ) {
          setErrorRegisterSociety("Error: Ya existe un usuario con ese email");
        } else {
          setErrorRegisterSociety("");
        }
        setAct(act + 1);
      }
    };
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(data));
  }

  function registerInvoice(data) {
    let url = "http://localhost:8080/insertinvoice";

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        if (
          this.responseText ===
          `Error:ER_DUP_ENTRY: Duplicate entry '${data.email}' for key 'email_UNIQUE'`
        ) {
          setErrorRegister("Error: Ya existe un usuario con ese email");
        } else {
          setErrorRegister("");
        }
        setAct(act + 1);
      }
    };
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(data));
  }
  const value = {
    users,
    setUsers,
    register,
    updateUser,
    errorRegister,
    registerSociety,
    society,
    registerInvoice,
  };

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
}
