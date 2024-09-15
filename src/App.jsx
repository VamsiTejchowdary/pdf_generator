import React, { useState, useEffect } from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "./Mydocument";
import invoiceData from './invoicedata.json';

const App = () => {

  return (
    <div>
      <h1>Invoice Generator</h1>

      {/* PDF Viewer (optional) */}
      {invoiceData && (
        <PDFViewer style={{ width: "200%", height: "600px" }}>
          <MyDocument invoiceData={invoiceData} />
        </PDFViewer>
      )}

      {/* Blue Download Button */}
      {invoiceData && (
        <PDFDownloadLink
          document={<MyDocument invoiceData={invoiceData} />}
          fileName="invoice.pdf"
          style={{
            textDecoration: "none",
            padding: "10px 20px",
            color: "#fff",
            backgroundColor: "#007bff",
            border: "none",
            borderRadius: "5px",
            display: "inline-block",
            marginTop: "20px",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          {({ loading }) => (loading ? "Loading Document..." : "Download PDF")}
        </PDFDownloadLink>
      )}
    </div>
  );
};

export default App;