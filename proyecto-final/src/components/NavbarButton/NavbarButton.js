import MenuIcon from "@mui/icons-material/Menu";
import "../Navbar/Navbar.css";
export default function NavbarButton() {
  function showMenu() {
    document.getElementById("dismiss").classList.remove("active");
    document.getElementById("sidebar").classList.remove("active");
    document.getElementsByClassName("overlay")[0].classList.add("active");
  }

  return (
    <div id="content">
      <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="container-fluid">
          <button
            type="button"
            id="sidebarCollapse"
            className="btn btn-color"
            onClick={() => showMenu()}
          >
            <MenuIcon />
          </button>
        </div>
      </nav>
    </div>
  );
}
