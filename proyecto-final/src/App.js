import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import NavbarButton from "./components/NavbarButton";
import Inicio from "./views/Inicio";

function App() {
  return (
    <div className="App">
      <Navbar />

      <NavbarButton />
      <Inicio />
    </div>
  );
}

export default App;
