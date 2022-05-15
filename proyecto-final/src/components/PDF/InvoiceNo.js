import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  invoiceNoContainer: {
    flexDirection: "row",
    marginTop: 36,
    justifyContent: "flex-end",
  },
  invoiceDateContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  invoiceDate: {
    fontSize: 12,
    fontStyle: "bold",
  },
  label: {
    width: 60,
  },
});

export default function InvoiceNo({ invoice }) {
  let x = invoice.trans_date.split("-");
  let j = "";
  for (let y of x) {
    j += y;
  }
  j += invoice.id_factura;
  return (
    <Fragment>
      <View style={styles.invoiceNoContainer}>
        <Text style={styles.label}>Factura Nº:</Text>
        <Text style={styles.invoiceDate}>{j}</Text>
      </View>
      <View style={styles.invoiceDateContainer}>
        <Text style={styles.label}>Fecha: </Text>
        <Text>{invoice.trans_date}</Text>
      </View>
    </Fragment>
  );
}
