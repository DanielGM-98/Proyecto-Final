import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

export default function RequireAuth() {
  const { auth } = useAuthContext();
  const location = useLocation();
  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/inicio" state={{ from: location }} replace />
  );
}
