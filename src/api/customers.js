import { axios } from "./axios";

export const getCustomers = () => {
  return axios.get("/customers");
};

export const postCustomer = () => {
  return axios.post("/customers");
};

export const putCustomer = (id, data) => {
  return axios.put(`/customers/${id}`, data);
};

export const deleteCustomer = () => {
  return axios.delete("/customers");
};
