import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center', // This ensures vertical alignment of logo and title
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 'auto', // Ensure the image scales proportionally
  },
  title: {
    fontSize: 24,
    textAlign: 'right',
    flexGrow: 1, // Ensures the title takes the available space
  },
  invoiceInfo: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  infoText: {
    fontSize: 12,
  },
  section: {
    marginBottom: 20,
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    borderTop: '1px solid #000',
  },
  tableHeader: {
    display: 'flex',
    flexDirection: 'row',
    borderBottom: '1px solid #000',
  },
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
    borderBottom: '1px solid #000',
  },
  tableCol: {
    flex: 1,
    padding: 5,
    textAlign: 'center',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  totalText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
  },
});

const MyDocument = ({ invoiceData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Image style={styles.logo} src= "./pdf/resume5.png" />
        <Text style={styles.title}>INVOICE</Text>
      </View>

      {/* Invoice Details */}
      <View style={styles.invoiceInfo}>
        <View>
          <Text style={styles.infoText}>Invoice Number: {invoiceData.invoiceNumber}</Text>
          <Text style={styles.infoText}>Date Issued: {invoiceData.invoiceDate}</Text>
        </View>
      </View>

      {/* Billing Section */}
      <View style={styles.section}>
        <Text style={styles.infoText}>Bill To:</Text>
        <Text style={styles.infoText}>{invoiceData.customer.company}</Text>
        <Text style={styles.infoText}>Number: {invoiceData.customer.number}</Text>
        <Text style={styles.infoText}>
          {invoiceData.customer.address1}, {invoiceData.customer.city}
        </Text>
        <Text style={styles.infoText}>
          {invoiceData.customer.postCode}, {invoiceData.customer.country}
        </Text>
      </View>

      {/* Table */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableCol}>ITEM</Text>
          <Text style={styles.tableCol}>QTY</Text>
          <Text style={styles.tableCol}>PRICE</Text>
          <Text style={styles.tableCol}>SUBTOTAL</Text>
        </View>

        {/* Products */}
        {invoiceData.products.map((product, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCol}>{product.name}</Text>
            <Text style={styles.tableCol}>{product.quantity}</Text>
            <Text style={styles.tableCol}>{invoiceData.currencySymbol}{product.price.toFixed(2)}</Text>
            <Text style={styles.tableCol}>
              {invoiceData.currencySymbol}
              {(product.price * product.quantity).toFixed(2)}
            </Text>
          </View>
        ))}

        {/* Totals */}
        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Total: {invoiceData.currencySymbol}{invoiceData.total.toFixed(2)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalText}>
            VAT ({invoiceData.vatPercentage}%): {invoiceData.currencySymbol}{invoiceData.vatAmount.toFixed(2)}
          </Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalText}>
            Invoice Total: {invoiceData.currencySymbol}{invoiceData.invoiceTotal.toFixed(2)}
          </Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Due Date: {invoiceData.dueDate}</Text>
        <Text>Please note: Payment made by card will reach us in 7 days.</Text>
      </View>
    </Page>
  </Document>
);

export default MyDocument;