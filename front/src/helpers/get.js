import axios from "axios";

const url = "http://localhost:3002/api/v1/invoices";

export const getAll = async (page = 1, limit = 5) => {
  try {
    const response = await axios.get(`${url}?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getOne = async (id) => {
  try {
    const response = await axios.get(`${url}/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error( error);
    throw error;
  }
};
