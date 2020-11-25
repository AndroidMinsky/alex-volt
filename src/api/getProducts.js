import { axios } from "./axios";

const getProducts = () => {
  return axios.get("/products");
};

export default getProducts;
