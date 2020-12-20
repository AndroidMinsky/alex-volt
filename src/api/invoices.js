import { axios } from "./axios";

export const getInvoices = () => {
  return axios.get("/invoices");
};

export const getInvoiceById = (id) => {
  return axios.get(`/invoices/${id}`);
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
