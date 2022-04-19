import React, { Component, Fragment } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import Invoice from "../../components/PDF/Invoice";
import { invoice } from "../../data/invoice-data";

export default function Prueba() {
  return (
    <Fragment>
      <PDFViewer width="1000" height="600" className="app">
        <Invoice invoice={invoice} />
      </PDFViewer>
    </Fragment>
  );
}
