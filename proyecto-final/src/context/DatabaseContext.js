import { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "./AuthContext";
const DatabaseContext = createContext({
  users: [],
  setUsers: () => {},
  register: () => {},
  updateUser: () => {},
});

export const useDatabaseContext = () => {
  return useContext(DatabaseContext);
};

export default function DatabaseContextProvider({ children }) {
  const { auth, login } = useAuthContext();
  const [users, setUsers] = useState(null);

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
    [auth],
  );

  function updateUser(data) {
    let url = "http://localhost:8080/updateuser";

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        console.log(this.responseText);
      }
    };
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(data));
  }

  function register(data) {
    let url = "http://localhost:8080/insertuser";

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        console.log(this.responseText);
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
  };

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
}
