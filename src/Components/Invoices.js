import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

export default function Invoices() {
  return (
    <Card>
      <Card.Body>
        <Card.Title className="d-inline-block mr-4 display-4">
          Invoice List
        </Card.Title>
        <Button variant="outline-dark" className="align-text-bottom">
          Create
        </Button>

        <Table striped hover className="mt-4">
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
            <tr>
              <td className="align-middle">1</td>
              <td className="align-middle">Mark Otto</td>
              <td className="align-middle">5%</td>
              <td className="align-middle">$125.75</td>
              <td>
                <Button variant="outline-dark">Edit</Button>
              </td>
            </tr>
            <tr>
              <td className="align-middle">2</td>
              <td className="align-middle">Jacob Thornton</td>
              <td className="align-middle">10%</td>
              <td className="align-middle">$420.69</td>
              <td>
                <Button variant="outline-dark">Edit</Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
