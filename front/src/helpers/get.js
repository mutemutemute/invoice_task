import axios from "axios";

const url = "http://localhost:3002/api/v1/invoices";

export const getAll = async () => {
  const response = await axios.get(url);

  return response.data;
};

export const getOne = async (id) => {
  const response = await axios.get(`${url}/${id}`, { withCredentials: true });

  return response.data;
};
