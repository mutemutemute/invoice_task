import { Link } from "react-router";
import { deleteOne } from "../helpers/delete";
import { useContext } from "react";
import InvoiceContext from "../contexts/InvoiceContext";
import UserContext from "../contexts/UserContext";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { GoDotFill } from "react-icons/go";

const InvoiceTableRow = ({ invoice }) => {
  const { setInvoices } = useContext(InvoiceContext);
  const { user } = useContext(UserContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { id, invoice_id, due_date, customer_name, amount, status } = invoice;
  const date = new Date(due_date).toISOString().split("T")[0];

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this invoice?"
    );

    if (confirmed) {
      setInvoices((prev) => ({
        ...prev,
        list: prev.list.filter((invoice) => invoice.id !== id),
      }));

      try {
        await deleteOne(id);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="bg-indigo-950 rounded-lg px-6 py-6 my-2 md:flex items-center justify-between gap-4 md:min-w-[600px]">
      <p className="font-semibold text-gray-300">{invoice_id}</p>
      <p className="text-sm text-gray-400">{date}</p>

      <p className="text-white text-sm">{customer_name}</p>

      <p className="font-bold text-lg text-white">£{amount}</p>

      <div
        className={`px-3 py-1 rounded-md text-sm font-semibold flex items-center gap-2 w-[100px]
        ${status === "Draft" ? "bg-gray-700 text-gray-300" : ""} 
        ${status === "Pending" ? "bg-yellow-900 text-yellow-500" : ""} 
        ${status === "Paid" ? "bg-green-900 text-green-400" : ""}`}
      >
        <GoDotFill />
        {status}
      </div>

      {user?.role === "admin" && (
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
            className="text-purple-400 hover:text-purple-500"
          >
            <IoIosArrowForward />
          </button>
          {isDropdownOpen && (
            <div className="absolute left-full top-0 ml-2 w-32 bg-white text-black shadow-lg rounded-md">
              <Link
                to={`/invoices/edit/${id}`}
                className="block px-4 py-2 hover:bg-gray-200"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200 text-red-600"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InvoiceTableRow;
