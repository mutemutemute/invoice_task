import { useState } from "react";
import InvoiceContext from "./InvoiceContext";

function InvoiceContextProvider({ children }) {
  const [invoices, setInvoices] = useState({ list: [], total: 0 });
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [invoicesPerPage] = useState(5);


  return (
    <InvoiceContext.Provider value={{ invoices, setInvoices, error, setError,currentPage, setCurrentPage, invoicesPerPage}}>
      {children}
    </InvoiceContext.Provider>
  );
}

export default InvoiceContextProvider;
