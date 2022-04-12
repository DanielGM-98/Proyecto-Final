import { createContext, useContext, useState } from "react";
import { useDatabaseContext } from "./DatabaseContext";
const AuthContext = createContext({
  auth: {},
  login: () => {},
  errorMessage: "",
  logout: () => {},
});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default function AuthContextProvider({ children }) {
  const { users } = useDatabaseContext();
  const [auth, setAuth] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  function logout() {
    setAuth(null);
  }
  function login(user) {
    let x = 0;
    for (let us of users) {
      if (user.email === us.email && user.password === us.password) {
        setAuth(us);
        x++;
      }
    }

    if (x > 0) {
      setErrorMessage("");
    } else {
      setErrorMessage("Email o contraseña incorrecto");
    }
  }

  const value = {
    auth,
    login,
    errorMessage,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
