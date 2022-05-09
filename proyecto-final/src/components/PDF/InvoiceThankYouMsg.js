import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    marginTop: 12,
  },
  reportTitle: {
    fontSize: 12,
    textAlign: "center",
    textTransform: "uppercase",
  },

  container: {
    marginTop: "15px",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 24,
    fontStyle: "bold",
    flexGrow: 1,
  },
});

const InvoiceThankYouMsg = ({ invoice }) => (
  <View style={styles.titleContainer}>
    <div style={styles.container}>
      <div>
        <Text style={styles.reportTitle}>Observaciones:</Text>
      </div>
      <div>
        <Text style={styles.reportTitle}>Forma de pago</Text>
        {invoice.forma_pago === "tarjeta" ? (
          <>
            <Text>Tarjeta</Text>
            <Text>Nº de tarjeta: {invoice.numero_tarjeta}</Text>
          </>
        ) : (
          <Text>Efectivo</Text>
        )}
      </div>
    </div>
  </View>
);

export default InvoiceThankYouMsg;
