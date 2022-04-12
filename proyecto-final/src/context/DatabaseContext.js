import { createContext, useContext, useState } from "react";

const DatabaseContext = createContext({
  users: [],
  setUsers: () => {},
});

export const useDatabaseContext = () => {
  return useContext(DatabaseContext);
};

export default function DatabaseContextProvider({ children }) {
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      setUsers(JSON.parse(this.responseText));
    }
  };

  xhttp.open("GET", "http://localhost:8080/users", true);
  xhttp.send();
  const [users, setUsers] = useState(null);

  const value = {
    users,
    setUsers,
  };

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
}
