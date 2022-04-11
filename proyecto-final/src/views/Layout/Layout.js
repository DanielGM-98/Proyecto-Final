import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import NavbarButton from "../../components/NavbarButton";

export default function Layout() {
  return (
    <div>
      <Navbar />
      <NavbarButton />
      <div className="text-center">
        <Outlet />
      </div>
    </div>
  );
}
