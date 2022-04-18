import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDatabaseContext } from "./DatabaseContext";
const AuthContext = createContext({
  auth: {},
  setAuth: () => {},
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
    let x = false;
    for (let us of users) {
      if (user.email === us.email && user.password === us.password) {
        setAuth(us);
        x = true;
      }
    }

    if (x) {
      setErrorMessage("");
      console.log(errorMessage);
    } else {
      setErrorMessage("Email o contraseña incorrecto");
      console.log(errorMessage);
    }

    return x;
  }

  const value = {
    auth,
    setAuth,
    login,
    errorMessage,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
