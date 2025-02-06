import InvoiceTable from "./InvoiceTable";
import InvoiceContext from "../contexts/InvoiceContext";
import { getAll } from "../helpers/get";
import { useEffect, useContext, useState } from "react";
import { Pagination } from "flowbite-react";
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

  const getAllInvoices = async (page, limit) => {
    try {
      const response = await getAll(page, limit);
      const invoicesArray = response.data?.invoices || [];
      const totalCount = response.data?.total_count || 0;
      setInvoices({ list: invoicesArray, total: totalCount });
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getAllInvoices(currentPage, invoicesPerPage);
  }, [currentPage, invoicesPerPage]);

  return (
    <>
      <div className="bg-gray-900">
        <InvoiceTable />
        {error && <p className="text-error">{error}</p>}
        <div className="flex overflow-x-auto sm:justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(invoices?.total / invoicesPerPage) || 1}
            onPageChange={(page) => setCurrentPage(page)}
            showIcons
          />
        </div>
      </div>
    </>
  );
};

export default Invoices;
