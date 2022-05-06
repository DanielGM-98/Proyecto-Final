import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontStyle: "bold",
  },
  description: {
    width: "45%",
    textAlign: "left",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingLeft: 8,
  },
  qty: {
    width: "10%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
  },
  rate: {
    width: "15%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
  },
  amount: {
    width: "15%",
    borderRightColor: borderColor,
    textAlign: "right",
    paddingRight: 8,
    borderRightWidth: 1,
  },
  amount2: {
    width: "15%",
    textAlign: "right",
    paddingRight: 8,
  },
});

const InvoiceTableRow = ({ items }) => {
  const rows = items.map((item) => (
    <View style={styles.row}>
      <Text style={styles.description}>{item.descripcion}</Text>
      <Text style={styles.qty}>{item.cantidad}</Text>
      <Text style={styles.rate}>{Number(item.precio).toFixed(2)}€</Text>
      <Text style={styles.amount}>
        {(item.cantidad * item.precio).toFixed(2)}€
      </Text>
      <Text style={styles.amount2}>
        {(item.cantidad * item.precio * item.iva).toFixed(2)}€
      </Text>
    </View>
  ));
  return <Fragment>{rows}</Fragment>;
};

export default InvoiceTableRow;
