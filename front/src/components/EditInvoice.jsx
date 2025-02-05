import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { getOne } from "../helpers/get";
import { updateOne } from "../helpers/update";
import { useContext } from "react";
import InvoiceContext from "../contexts/InvoiceContext";
const EditInvoice = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { error, setError } = useContext(InvoiceContext);
  const params = useParams();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await updateOne(params.id, data);
      navigate("/invoices");
    } catch (error) {
      setError(error.message);
    }
  };

  const getInvoice = async () => {
    try {
      const response = await getOne(params.id);

      const { amount, customer_name, due_date, status } = response.data;
      const date = due_date
        ? new Date(due_date).toISOString().split("T")[0]
        : "";
      setValue("due_date", date);
      setValue("customer_name", customer_name);
      setValue("amount", amount);
      setValue("status", status);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getInvoice();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2 justify-center items-center h-screen bg-black">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-16 bg-gray-900 rounded-lg "
        >
          <section className="flex flex-col">
            <label htmlFor="due_date" className="text-white">
              Due Date
            </label>
            <input
              {...register("due_date", { required: "Due Date is required" })}
              type="date"
              className="input input-bordered w-100"
            />
            <p className="text-error">{errors.due_date?.message}</p>
          </section>

          <section className="flex flex-col">
            <label htmlFor="customer_name" className="text-white">
              Customer Full Name
            </label>
            <input
              {...register("customer_name", {
                required: "Customer Full Name is required",
              })}
              type="text"
              placeholder="Customer Full Name"
              className="input input-bordered w-100"
            />
            <p className="text-error">{errors.customer_name?.message}</p>
          </section>

          <section className="flex flex-col">
            <label htmlFor="amount" className="text-white">
              Amount
            </label>
            <input
              {...register("amount", { required: "Amount is required" })}
              type="number"
              step="0.01"
              className="input input-bordered w-100"
            />
            <p className="text-error">{errors.amount?.message}</p>
          </section>

          <section className="flex flex-col ">
            <label htmlFor="status" className="text-white">
              Status
            </label>
            <select
              {...register("status", { required: true })}
              className="select select-bordered w-100 mb-4"
            >
              <option value="Draft">Draft</option>
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
            </select>
            <p>{errors.status?.message}</p>
          </section>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => navigate("/invoices")}
              className="btn border-gray-600 px-4 py-2 bg-gray-600 text-white"
            >
              Cancel
            </button>
            <button
              className="btn bg-indigo-500 border-indigo-500 text-white"
              type="submit"
            >
              Edit Invoice
            </button>
          </div>
          {error && <p className="text-error">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default EditInvoice;
