import { createContext, useContext, useState } from "react";

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
  const [auth, setAuth] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  function logout() {
    setAuth(null);
  }
  function login(user) {
    if (user.email === "pepe@email.com" && user.password === "1234") {
      setAuth(user);
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
