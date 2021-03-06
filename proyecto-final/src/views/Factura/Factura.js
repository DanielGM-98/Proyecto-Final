import React, { Fragment, useEffect, useState } from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "../../components/PDF/Invoice";
import { useParams } from "react-router-dom";
import logo from "../../components/PDF/images/logo.jpg";

//app.use(express.static(path.join(__dirname, "public")));
//Añadir si se va a usar el método POST
//app.use(express.json());

export default function Prueba() {
  const { id } = useParams();
  const [factura, setFactura] = useState(null);
  const [sociedad, setSociedad] = useState(null);
  const [n, setN] = useState(0);

  //Llamar a todas las facturas del usuario
  useEffect(
    function () {
      function callFactura() {
        let xhttp = new XMLHttpRequest();
        let data = { id_factura: id };

        xhttp.onreadystatechange = function () {
          if (this.readyState === 4 && this.status === 200) {
            let x = JSON.parse(this.responseText);
            //console.log(x);
            let j = [];

            for (let y of x) {
              //console.log(y);
              let h = JSON.parse(y.datos);
              j = [];
              for (let z of h) {
                //console.log(h);
                j.push(z);
                y.datos = j;
              }

              //let j = JSON.parse(y);
              /* console.log(j); */
            }

            //x.datos = j;
            //console.log(x);
            setFactura(x[0]);
            //console.log(factura);
          }
        };

        xhttp.open("POST", "http://localhost:8080/selectinvoice", true);
        xhttp.setRequestHeader(
          "Content-Type",
          "application/json",
          "Access-Control-Allow-Origin",
        );
        xhttp.send(JSON.stringify(data));
      }
      callFactura();
    },
    [id],
  );
  let invoice = {
    id: "5df3180a09ea16dc4b95f910",
    invoice_no: "201906-28",
    balance: "$2,283.74",
    company: "empresa",
    email: "susanafuentes@mantrix.com",
    phone: "+1 (872) 588-3809",
    address: "922 Campus Road, Drytown, Wisconsin, 1986",
    trans_date: "2019-09-12",
    due_date: "2019-10-12",
    logo: logo,
    items: [
      {
        sno: 1,
        desc: "ad sunt culpa occaecat qui",
        qty: 5,
        rate: 405.89,
      },
      {
        sno: 2,
        desc: "cillum quis sunt qui aute",
        qty: 5,
        rate: 373.11,
      },
      {
        sno: 3,
        desc: "ea commodo labore culpa irure",
        qty: 5,
        rate: 458.61,
      },
      {
        sno: 4,
        desc: "nisi consequat et adipisicing dolor",
        qty: 10,
        rate: 725.24,
      },
      {
        sno: 5,
        desc: "proident cillum anim elit esse",
        qty: 4,
        rate: 141.02,
      },
    ],
  };

  //Llama a una sociedad
  useEffect(
    function () {
      function callSociety() {
        if (factura) {
          let xhttp = new XMLHttpRequest();
          //console.log(society);
          let data = { id_sociedad: factura.id_sociedad };
          xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
              setN(n + 1);
              setSociedad(JSON.parse(this.responseText));
            }
          };

          xhttp.open("POST", "http://localhost:8080/selectsociety", true);
          xhttp.setRequestHeader("Content-Type", "application/json");
          xhttp.send(JSON.stringify(data));
        }
      }
      callSociety();
    },
    [factura],
  );

  if (factura && sociedad) {
    if (factura.forma_pago === "tarjeta") {
      factura.numero_tarjeta =
        "XXXX-XXXX-XXXX-" + factura.numero_tarjeta.slice(13, 16);
    }
    invoice = {
      id_factura: factura.id_factura,
      id: factura.codigo,
      invoice_no: "201906-28",
      balance: "$2,283.74",
      company: factura.nombre_empresa,
      email: factura.email,
      phone: "+" + factura.codigo_pais + " " + factura.telefono_empresa,
      address: factura.direccion_empresa,
      trans_date: factura.date,
      due_date: "2019-10-12",
      items: factura.datos,
      logo: factura.logo,
      forma_pago: factura.forma_pago,
      numero_tarjeta: factura.numero_tarjeta,
      cif: factura.cif,
      nombre_sociedad: sociedad[0].nombre_sociedad,
      direccion_sociedad: sociedad[0].direccion_sociedad,
      cif_sociedad: sociedad[0].cif,
      telefono_sociedad: sociedad[0].telefono_sociedad,
      email_sociedad: sociedad[0].email_sociedad,
      codigo_pais_sociedad: sociedad[0].codigo_pais,
    };
  }

  if (!factura) {
    return (
      <div>
        <h1>Cargando...</h1>
      </div>
    );
  }
  return (
    <div className="my-5">
      <Fragment>
        <PDFViewer width="1000" height="600" className="app">
          <Invoice invoice={invoice} />
        </PDFViewer>
      </Fragment>

      <div>
        <PDFDownloadLink
          document={<Invoice invoice={invoice} />}
          fileName={factura.codigo + ".pdf"}
          className="btn btn-primary mt-3"
        >
          {({ blob, url, loading, error }) =>
            loading ? "Cargando documento..." : "Descargar PDF"
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
}
