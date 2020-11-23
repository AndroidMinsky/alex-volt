import { axios } from "./axios";

const getInvoices = () => {
  return axios.get("/invoices");
};

export default getInvoices;
