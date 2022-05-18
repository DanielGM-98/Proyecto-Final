import React from "react";
import {
  Page,
  Document,
  Image,
  StyleSheet,
  View,
  Text,
} from "@react-pdf/renderer";
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
  },
  logo: {
    width: 74,
    height: 66,
  },

  descSociedad: {
    color: "black",
  },

  society: {
    float: "right",
  },

  titleContainer: {
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "space-between",
  },
});

export default function Invoice({ invoice }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.titleContainer}>
          <Image
            style={styles.logo}
            src={invoice.logo}
            id="logo-img"
            crossorigin="anonymous"
          />

          <div style={styles.society}>
            <Text>{invoice.nombre_sociedad}</Text>
            <Text>{invoice.direccion_sociedad}</Text>
            <Text>{invoice.cif_sociedad}</Text>
            <Text>
              +{invoice.codigo_pais_sociedad} {invoice.telefono_sociedad}
            </Text>
            <Text>{invoice.email_sociedad}</Text>
          </div>
        </View>
        <InvoiceNo invoice={invoice} />
        <BillTo invoice={invoice} />
        <InvoiceItemsTable invoice={invoice} />
        <InvoiceThankYouMsg invoice={invoice} />
      </Page>
    </Document>
  );
}
