import axios from "axios";

const url = "http://localhost:3002/api/v1/invoices";

export const deleteOne = async (id) => {
  await axios.delete(`${url}/${id}`, { withCredentials: true });
};
