import React, { useEffect, useState } from "react";
import getCustomers from "../api/getCustomers";

import Spinner from "./Spinner";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

export default function Customers() {
  const [customers, setCustomers] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    document.title = "Customer List";
    getCustomers()
      .then((res) => {
        setCustomers(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
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
                    <Button variant="outline-dark">Edit</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
}
