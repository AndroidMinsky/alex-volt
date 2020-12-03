import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCustomers, selectCustomers } from "./customersSlice";
import { Helmet } from "react-helmet-async";

import Spinner from "../../Components/Spinner";
import EditCustomers from "./EditCustomers";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

export default function Customers() {
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const { customers, loading, error } = useSelector(selectCustomers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setId(id);
    setShow(true);
  };

  return (
    <>
      <Helmet>
        <title>Customer List</title>
      </Helmet>
      <Card>
        <Card.Body>
          <Card.Title className="d-inline-block mr-4 display-4">
            Customer List
          </Card.Title>
          <Button variant="outline-dark" className="align-text-bottom">
            Create
          </Button>

          {loading && <Spinner />}

          {!loading && !error && (
            <Table striped hover className="mt-4">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Billing Address</th>
                  <th>Phone Number</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td className="align-middle">{customer.id}</td>
                    <td className="align-middle">{customer.name}</td>
                    <td className="align-middle">{customer.address}</td>
                    <td className="align-middle">{customer.phone}</td>
                    <td>
                      <Button
                        variant="outline-dark"
                        onClick={() => handleShow(customer.id)}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
      <EditCustomers show={show} handleClose={handleClose} id={id} />
    </>
  );
}
