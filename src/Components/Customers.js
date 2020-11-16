import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

export default function Customers() {
  return (
    <Card>
      <Card.Body>
        <Card.Title className="d-inline-block mr-4 display-4">
          Customer List
        </Card.Title>
        <Button variant="outline-dark" className="align-text-bottom">
          Create
        </Button>

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
            <tr>
              <td className="align-middle">1</td>
              <td className="align-middle">Kaia Brooks</td>
              <td className="align-middle">
                4258 Trymore Road, Wanamingo MN 55983
              </td>
              <td className="align-middle">651-356-7860</td>
              <td>
                <Button variant="outline-dark">Edit</Button>
              </td>
            </tr>
            <tr>
              <td className="align-middle">2</td>
              <td className="align-middle">Kendall Kirkpatrick</td>
              <td className="align-middle">
                3077 Tipple Road, Philadelphia PA 19103
              </td>
              <td className="align-middle">215-868-1366</td>
              <td>
                <Button variant="outline-dark">Edit</Button>
              </td>
            </tr>
            <tr>
              <td className="align-middle">3</td>
              <td className="align-middle">Alysha Markham</td>
              <td className="align-middle">
                1358 Colony Street, Cheshire CT 06410
              </td>
              <td className="align-middle">203-417-2435</td>
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
