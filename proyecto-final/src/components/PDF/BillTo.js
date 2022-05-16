import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer/";

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 36,
  },
  billTo: {
    marginTop: 20,
    paddingBottom: 3,
    fontFamily: "Helvetica-Oblique",
  },
});

const BillTo = ({ invoice }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.billTo}>Cliente:</Text>
    <Text>Nombre: {invoice.company}</Text>
    <Text>Dirección: {invoice.address}</Text>
    <Text>Teléfono: {invoice.phone}</Text>
    <Text>Email: {invoice.email}</Text>
  </View>
);

export default BillTo;
