import { useContext } from "react";
import InvoiceTableRow from "./InvoiceTableRow";
import InvoiceContext from "../contexts/InvoiceContext";

const InvoiceTable = () => {
  const { invoices } = useContext(InvoiceContext);

  return (
    <div className="flex flex-col mt-6 items-center justify-center ">
      {invoices.list && invoices.list.length > 0 ? (
        invoices.list.map((invoice, index) => (
          <InvoiceTableRow
            key={invoice.id}
            invoice={invoice}
            className="w-full max-w-lg h-[80px] flex-grow-0 flex items-center justify-between border-b border-gray-600"
          />
        ))
      ) : (
        <p className="text-gray-500 text-center mt-4">
          No invoices found for the selected status.
        </p>
      )}
    </div>
  );
};

export default InvoiceTable;
