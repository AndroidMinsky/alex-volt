import { axios } from "./axios";

const getCustomers = () => {
  return axios.get("/customers");
};

export default getCustomers;
