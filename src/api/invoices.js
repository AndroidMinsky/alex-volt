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

export const putInvoice = (id, data) => {
  return axios.put(`/invoices/${id}`, data);
};

export const deleteInvoice = () => {
  return axios.delete("/invoices");
};
