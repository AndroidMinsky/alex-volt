import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

export default function Products() {
  return (
    <Card>
      <Card.Body>
        <Card.Title className="d-inline-block mr-4 display-4">
          Product List
        </Card.Title>
        <Button variant="outline-dark" className="align-text-bottom">
          Create
        </Button>

        <Table striped hover className="mt-4">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="align-middle">1</td>
              <td className="align-middle">Phone Holder</td>
              <td className="align-middle">$19.99</td>
              <td>
                <Button variant="outline-dark">Edit</Button>
              </td>
            </tr>
            <tr>
              <td className="align-middle">2</td>
              <td className="align-middle">Pet Rock</td>
              <td className="align-middle">$7.49</td>
              <td>
                <Button variant="outline-dark">Edit</Button>
              </td>
            </tr>
            <tr>
              <td className="align-middle">3</td>
              <td className="align-middle">Egg Timer</td>
              <td className="align-middle">$249.75</td>
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
