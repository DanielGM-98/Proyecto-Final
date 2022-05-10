import { Link } from "react-router-dom";
import "./Settings.scss";
import "./Settings.css";
import AddIcon from "@mui/icons-material/Add";
import UserData from "../UserData";
import { useAuthContext } from "../../context/AuthContext";
import SocietyCreate from "../SocietyCreate/SocietyCreate";
import MySocieties from "../MySocieties";

export default function Settings() {
  const { auth } = useAuthContext();
  return (
    <div className="">
      <h1 className="mb-5">Panel de Control</h1>
      <div className="rounded-lg d-block d-sm-flex">
        <div className="container bg-light settings-menu scroll-part">
          <div className="row">
            <div className="d-flex align-items-start">
              <div className="profile-tab-nav border-right">
                <div className="p-4">
                  <h4 className="text-center">
                    {auth.nombre} {auth.apellidos}
                  </h4>
                </div>
                <div
                  className="nav flex-column nav-pills"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <button
                    className="nav-link active"
                    id="v-pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-home"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-home"
                    aria-selected="true"
                  >
                    <i className="fa fa-user text-center mr-1"></i> Datos del
                    usuario
                  </button>
                  <button
                    className="nav-link"
                    id="v-pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false"
                  >
                    <AddIcon />
                    Añadir Sociedad
                  </button>
                  <button
                    className="nav-link"
                    id="v-pills-messages-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-messages"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-messages"
                    aria-selected="false"
                  >
                    Mis Sociedades
                  </button>
                  <button
                    className="nav-link"
                    id="v-pills-settings-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-settings"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-settings"
                    aria-selected="false"
                  >
                    Editar Usuario
                  </button>
                </div>
              </div>
              <div className="tab-content" id="v-pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="v-pills-home"
                  role="tabpanel"
                  aria-labelledby="v-pills-home-tab"
                >
                  <UserData />
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-profile"
                  role="tabpanel"
                  aria-labelledby="v-pills-profile-tab"
                >
                  <SocietyCreate />
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-messages"
                  role="tabpanel"
                  aria-labelledby="v-pills-messages-tab"
                >
                  <MySocieties />
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-settings"
                  role="tabpanel"
                  aria-labelledby="v-pills-settings-tab"
                >
                  ...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
