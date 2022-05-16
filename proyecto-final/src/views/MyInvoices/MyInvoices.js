import { Link } from "react-router-dom";
export default function MyInvoices() {
  return (
    <div>
      <h1>Facturas</h1>
      <Link to="/factura" className="text-info ">
        Factura de ejemplo
      </Link>
    </div>
  );
}
