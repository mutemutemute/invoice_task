import InvoiceTable from "./InvoiceTable";
import InvoiceContext from "../contexts/InvoiceContext";
import { getAll } from "../helpers/get";
import { useEffect } from "react";
import { useContext } from "react";
const Invoices = () => {
  const { setInvoices, error, setError } = useContext(InvoiceContext);

  const getAllInvoices = async () => {
    try {
      const response = await getAll();
      const invoicesArray = response.data?.invoices || [];
      const totalCount = response.data?.total_count || 0;
      setInvoices({ list: invoicesArray, total: totalCount });
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getAllInvoices();
  }, []);

  return (
    <div className="bg-gray-900">
      <InvoiceTable />
      {error && <p className="text-error">{error}</p>}
    </div>
  );
};

export default Invoices;
