import { createSelector } from "reselect";

const customersSelector = (state) => state;
const idSelector = (_, props) => props.id;

export const customerSelector = createSelector(
  customersSelector,
  idSelector,
  (customers, id) =>
    customers.find((customer) => {
      return customer.id === id;
    })
);
