import React, { useEffect, useState } from "react";
import getInvoices from "../api/getInvoices";

import Spinner from "./Spinner";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";

export default function Invoices() {
  const [invoices, setInvoices] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    document.title = "Invoice List";
    getInvoices()
      .then((res) => {
        setInvoices(res.data);
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
        <Card.Title className="d-inline-block mr-4 mb-4 display-4">
          Invoice List
        </Card.Title>
        <Button variant="outline-dark" className="align-text-bottom">
          Create
        </Button>

        {loading && <Spinner />}

        {!loading && error && (
          <Alert variant="danger">
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>
              Change this and that and try again. Duis mollis, est non commodo
              luctus, nisi erat porttitor ligula, eget lacinia odio sem nec
              elit. Cras mattis consectetur purus sit amet fermentum.
            </p>
          </Alert>
        )}

        {!loading && !error && (
          <Table striped hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Customer Name</th>
                <th>Discount</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="align-middle">{invoice.id}</td>
                  <td className="align-middle">{invoice.customerName}</td>
                  <td className="align-middle">{invoice.discount}%</td>
                  <td className="align-middle">${invoice.totalPrice}</td>
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
