import axios from "axios";

const url = "http://localhost:3002/api/v1/invoices";

export const updateOne = async (id, data) => {
  await axios.patch(`${url}/${id}`, data, { withCredentials: true });
};
