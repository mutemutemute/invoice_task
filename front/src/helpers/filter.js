import axios from "axios";

const url = "http://localhost:3002/api/v1/invoices/filter";

export const filterInvoices = async (filters = {}, page = 1, limit = 5) => {
  try {
    const queryString = new URLSearchParams(filters, page, limit).toString();

    
    const requestUrl = `${url}?page=${page}&limit=${limit}${queryString ? `&${queryString}` : ""}`;
    console.log(queryString)
console.log(requestUrl);
    const response = await axios.get(requestUrl, { withCredentials: true });

    return response.data;
  } catch (error) {
    console.error("API Request Failed:", error);
    throw error;
  }
};
