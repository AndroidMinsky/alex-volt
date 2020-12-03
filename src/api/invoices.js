import { axios } from "./axios";

export const getInvoices = () => {
  return axios.get("/invoices");
};

export const postInvoice = () => {
  return axios.post("/invoices");
};

export const putInvoice = () => {
  return axios.put("/invoices");
};

export const deleteInvoice = () => {
  return axios.delete("/invoices");
};
