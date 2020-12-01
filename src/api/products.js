import { axios } from "./axios";

export const getProducts = () => {
  return axios.get("/products");
};

export const postProduct = () => {
  return axios.post("/products");
};

export const putProduct = () => {
  return axios.put("/products");
};

export const deleteProduct = () => {
  return axios.delete("/products");
};
