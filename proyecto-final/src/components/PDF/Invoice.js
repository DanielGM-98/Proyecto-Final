import React from "react";
import { Page, Document, Image, StyleSheet } from "@react-pdf/renderer";
import InvoiceTitle from "./InvoiceTitle";
import BillTo from "./BillTo";
import InvoiceNo from "./InvoiceNo";
import InvoiceItemsTable from "./InvoiceItemsTable";
import InvoiceThankYouMsg from "./InvoiceThankYouMsg";

//import logo from "./images/logo.jpg";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  logo: {
    width: 74,
    height: 66,
  },

  descSociedad: {
    color: "black",
  },
});

export default function Invoice({ invoice }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image
          style={styles.logo}
          src={invoice.logo}
          id="logo-img"
          crossorigin="anonymous"
        />
        <InvoiceTitle style={styles.descSociedad} title="Invoice" />
        <InvoiceNo invoice={invoice} />
        <BillTo invoice={invoice} />
        <InvoiceItemsTable invoice={invoice} />
        <InvoiceThankYouMsg invoice={invoice} />
      </Page>
    </Document>
  );
}
