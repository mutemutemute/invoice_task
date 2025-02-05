import { useContext, useState, useEffect } from "react";
import { filterInvoices } from "../helpers/filter";
import InvoiceTableRow from "./InvoiceTableRow";
import InvoiceContext from "../contexts/InvoiceContext";
import UserContext from "../contexts/UserContext";
import CreateInvoice from "./CreateInvoice";
import Navbar from "./Navbar";

const InvoiceTable = () => {
  const { invoices, setInvoices, error, setError } = useContext(InvoiceContext);
  const { user } = useContext(UserContext);
  const [selectedStatus, setSelectedStatus] = useState("Filter by status");

  const fetchInvoices = async (status) => {
    setError(null);

    try {
      let response;

      if (status === "All Invoices" || !status) {
        response = await filterInvoices();
      } else {
        response = await filterInvoices({ status });
      }

      if (!response || !response.data) {
        throw new Error("Invalid response from API");
      }

      const invoicesList = Array.isArray(response.data)
        ? response.data
        : response.data.invoices || [];

      setInvoices({ list: invoicesList });
    } catch (error) {
      setError("Failed to load invoices. Please try again.");
    }
  };

  useEffect(() => {
    fetchInvoices("Filter by status");
  }, []);

  const handleStatusChange = (event) => {
    const status = event.target.value;
    setSelectedStatus(status);

    fetchInvoices(status === "Filter by status" ? null : status);
  };

  return (
    <div className="flex flex-col md:flex-row lg:flex-row  bg-[#141625] min-h-screen">
      <Navbar />

      <div className="flex flex-col px-4 sm:px-8 md:px-12 lg:px-10 pt-24 lg:pt-6 w-full">
        <div className="w-full flex flex-col md:flex-row justify-center gap-12 items-center ">
          <div className="text-left">
            <h1 className="text-white text-2xl md:text-3xl font-bold ">
              Invoices
            </h1>
            <h2 className="text-gray-400 text-sm md:text-base">
              {invoices.list?.length
                ? `There are ${invoices.list.length} total invoices`
                : "No invoices available"}
            </h2>
          </div>

          <div className="md:flex gap-4 mx-2 ">
            <select
              name="status"
              id="status"
              value={selectedStatus}
              onChange={handleStatusChange}
              className="border border-gray-300 rounded-md p-2 text-white mb-5"
            >
              <option value="Filter by status" className="text-black">
                Filter by status
              </option>
              <option value="Draft" className="text-black">
                Draft
              </option>
              <option value="Pending" className="text-black">
                Pending
              </option>
              <option value="Paid" className="text-black">
                Paid
              </option>
            </select>

            {user?.role === "admin" && <CreateInvoice />}
          </div>
        </div>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <div className="flex flex-col gap-4 mt-6 items-center justify-center ">
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
      </div>
    </div>
  );
};

export default InvoiceTable;
