import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCustomers,
  selectCustomers,
} from "../features/customers/customersSlice";

export default function CustomersDropdown({ customer, setCustomer, register }) {
  const dispatch = useDispatch();
  const { customers } = useSelector(selectCustomers);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  return (
    <Form.Group>
      <Form.Label>Customer</Form.Label>
      <Form.Control
        as="select"
        name="customer"
        ref={register}
        custom
        value={customer}
        onChange={(e) => setCustomer(e.target.value)}
      >
        {customers.map((cust) => (
          <option key={cust.name} value={cust.name}>
            {cust.name}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
}
