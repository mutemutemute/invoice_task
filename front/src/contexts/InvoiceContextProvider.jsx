import { useState } from "react";
import InvoiceContext from "./InvoiceContext";

function InvoiceContextProvider({ children }) {
  const [invoices, setInvoices] = useState({ list: [], total: 0 });
  const [error, setError] = useState("");

  return (
    <InvoiceContext.Provider value={{ invoices, setInvoices, error, setError }}>
      {children}
    </InvoiceContext.Provider>
  );
}

export default InvoiceContextProvider;
