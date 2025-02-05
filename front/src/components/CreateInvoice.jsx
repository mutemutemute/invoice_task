import { useState, useContext } from "react";
import { set, useForm } from "react-hook-form";
import { post } from "../helpers/post";
import { useNavigate } from "react-router";
import InvoiceContext from "../contexts/InvoiceContext";

const CreateInvoice = () => {
  const { setInvoices, error, setError } = useContext(InvoiceContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await post(data);

      setInvoices((prev) => ({
        ...prev,
        list: [...prev.list, response.data],
      }));

      setIsOpen(false);
      navigate("/invoices");
      reset();
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-indigo-500 text-white rounded-md"
      >
        New Invoice
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96">
            <h1 className="text-2xl font-bold text-white mb-4">
              Create Invoice
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  htmlFor="customer_name"
                  className="block text-sm font-medium text-gray-300"
                >
                  Customer Name
                </label>
                <input
                  {...register("customer_name", {
                    required: "Customer name is required",
                  })}
                  type="text"
                  className="input input-bordered mt-1 p-2  rounded-md w-full"
                />
                {errors.customer_name && (
                  <p className="text-red-500 text-sm">
                    {errors.customer_name.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="due_date"
                  className="block text-sm font-medium text-gray-300 "
                >
                  Due Date
                </label>
                <input
                  {...register("due_date", {
                    required: "Due date is required",
                  })}
                  type="date"
                  className="mt-1 p-2 rounded-md w-full input input-bordered"
                />
                {errors.due_date && (
                  <p className="text-red-500 text-sm">
                    {errors.due_date.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-300"
                >
                  Amount
                </label>
                <input
                  {...register("amount", {
                    required: "Amount is required",
                    min: 1,
                  })}
                  type="number"
                  className="mt-1 p-2 input input-bordered rounded-md w-full "
                />
                {errors.amount && (
                  <p className="text-red-500 text-sm">
                    {errors.amount.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-300"
                >
                  Status
                </label>
                <select
                  {...register("status", { required: "Status is required" })}
                  className="mt-1 p-2 select select-bordered rounded-md w-full "
                >
                  <option value="Draft">Draft</option>
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                </select>
                {errors.status && (
                  <p className="text-red-500 text-sm">
                    {errors.status.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="btn border-gray-600 px-4 py-2 bg-gray-600 text-white "
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn border-indigo-500 px-4 py-2 bg-indigo-500 text-white"
                >
                  Create Invoice
                </button>
              </div>
              {error && <p className="text-red-500">{error}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateInvoice;
