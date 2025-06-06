import { useContext, useState, useEffect } from "react";
import { filterInvoices } from "../helpers/filter";
import { getAll } from "../helpers/get";
import InvoiceTable from "./InvoiceTable";
import InvoiceContext from "../contexts/InvoiceContext";
import UserContext from "../contexts/UserContext";
import CreateInvoice from "./CreateInvoice";
import Navbar from "./Navbar";

const Invoices = () => {
  const {
    invoices,
    setInvoices,
    error,
    setError,
    currentPage,
    setCurrentPage,
    invoicesPerPage,
  } = useContext(InvoiceContext);

  const { user } = useContext(UserContext);
  const [selectedStatus, setSelectedStatus] = useState("Filter by status");

  const fetchInvoices = async (status, page, limit) => {
    setError(null);
    setInvoices({ list: [], total: 0 });

    try {
      let response;

      if (status && status !== "Filter by status") {
        response = await filterInvoices({ status }, page, limit);
      } else {
        response = await getAll(page, limit);
      }

      const invoicesArray = response.data?.invoices || [];
      const totalCount = Number(response.data?.total_count) || 0;

      setInvoices({ list: invoicesArray, total: totalCount });
    } catch (error) {
      setError("Failed to load invoices. Please try again.");
    }
  };

  useEffect(() => {
    fetchInvoices(selectedStatus, currentPage, invoicesPerPage);
  }, [selectedStatus, currentPage, invoicesPerPage]);

  const handleStatusChange = (event) => {
    const status = event.target.value;

    setSelectedStatus(status);
    setCurrentPage(1);
    setInvoices({ list: [], total: 0 });
  };

  const totalPages = Math.ceil(invoices.total / invoicesPerPage);

  return (
    <>
      <div className="dark:bg-[#141625] ">
        <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row  ">
          <Navbar />

          <div className="flex flex-col px-4 sm:px-8 md:px-12 lg:px-10 pt-24 lg:pt-6 w-full ">
            <div className="w-full flex flex-col md:flex-row justify-center gap-12 items-center">
              <div className="text-left">
                <h1 className="dark:text-white text-2xl md:text-3xl font-bold">
                  Invoices
                </h1>
                <h2 className="text-gray-400 text-sm md:text-base">
                  {invoices.total > 0
                    ? `There are ${invoices.total} total invoices`
                    : "No invoices available"}
                </h2>
              </div>

              <div className="md:flex gap-4 mx-2">
                <select
                  name="status"
                  id="status"
                  value={selectedStatus}
                  onChange={handleStatusChange}
                  className="border border-gray-300 rounded-md p-2 dark:text-white mb-5"
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
          </div>
        </div>
        <div className="h-screen">
          <InvoiceTable />

          <div className="flex justify-center items-center py-10">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 mx-2 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className=" px-4">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage >= totalPages}
              className="px-4 py-2 mx-2 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoices;
