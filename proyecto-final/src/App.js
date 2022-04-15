import { Routes, Route } from "react-router-dom";
import "./App.css";
import Inicio from "./views/Inicio";
import Layout from "./views/Layout";
import RequireAuth from "./components/RequireAuth";
import MyInvoices from "./views/MyInvoices";
import Login from "./views/Login";
import Register from "./views/Register";
import Missing from "./views/Missing";
import Settings from "./views/Settings";
import UserData from "./views/UserData";
import UserUpdate from "./views/UserUpdate";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="inicio" element={<Inicio />} />
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Register />} />
        <Route element={<RequireAuth />}>
          <Route index element={<Inicio />} />
          <Route path="facturas" element={<MyInvoices />} />
          <Route path="ajustes" element={<Settings />} />
          <Route path="userdata" element={<UserData />} />
          <Route path="editarusuario" element={<UserUpdate />} />
        </Route>
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
