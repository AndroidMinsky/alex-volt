import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectInvoiceById } from "./invoicesSlice";
import { fetchCustomers, selectCustomers } from "../customers/customersSlice";
import { fetchProducts, selectProducts } from "../products/productsSlice";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";

import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { RiDeleteBin2Line } from "react-icons/ri";

export default function EditInvoices() {
  let { id } = useParams();
  let history = useHistory();
  const dispatch = useDispatch();

  const invoice = useSelector((state) => selectInvoiceById(state, id));
  const { customers } = useSelector(selectCustomers);
  const { products } = useSelector(selectProducts);

  const [productsList, setproductsList] = useState(invoice.products);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchProducts());
  }, []);

  const handleCancel = () => {
    history.goBack();
  };

  const handleQuantityChange = (e, name) => {
    const productPrice = products.find((product) => product.name === name)
      .price;
    const newPrice = productPrice * e;
  };

  const onSubmit = () => {};

  const error = (
    <Alert variant="danger">
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      <p>
        Something went terribly wrong! Please{" "}
        <Alert.Link onClick={handleCancel}>go back</Alert.Link>.
      </p>
    </Alert>
  );

  return (
    <>
      <Helmet>
        <title>Invoice List - Edit Invoice</title>
      </Helmet>
      <Card>
        <Card.Body>
          <Card.Title className="mr-4 mb-4 display-4">Edit Invoice</Card.Title>
          {invoice ? (
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Col sm={3} className="p-0">
                <Form.Group>
                  <Form.Label>Discount (%)</Form.Label>
                  <Form.Control
                    placeholder="Discount"
                    name="discount"
                    type="number"
                    defaultValue={invoice.discount}
                    ref={register}
                  />
                </Form.Group>
              </Col>

              <Col sm={6} className="p-0">
                <Form.Group>
                  <Form.Label>Customer</Form.Label>
                  <Form.Control
                    as="select"
                    name="customer"
                    ref={register}
                    custom
                    defaultValue={invoice.customerName}
                  >
                    {customers.map((customer) => (
                      <option key={customer.name} value={customer.name}>
                        {customer.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col sm={6} className="p-0">
                <Form.Group>
                  <Form.Label>Add Product</Form.Label>
                  <InputGroup>
                    <Form.Control
                      as="select"
                      name="product"
                      ref={register}
                      defaultValue="0"
                      custom
                    >
                      <option value="0" disabled>
                        Choose...
                      </option>
                      {products.map((product) => (
                        <option key={product.name} value={product.name}>
                          {product.name}
                        </option>
                      ))}
                    </Form.Control>
                    <InputGroup.Append>
                      <Button
                        variant="outline-dark"
                        className="align-text-bottom d-inline-block"
                      >
                        Add
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>
              </Col>

              <Table striped hover className="mt-4">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.products.map((product) => (
                    <tr key={product.name}>
                      <td className="align-middle">{product.name}</td>
                      <td className="align-middle">${product.price}</td>
                      <td className="align-middle">
                        <Col sm={4} className="p-0">
                          <Form.Group className="m-0">
                            <Form.Label srOnly>Quantity</Form.Label>
                            <Form.Control
                              placeholder="Quantity"
                              name="Quantity"
                              type="number"
                              defaultValue={product.quantity}
                              onChange={(e) =>
                                handleQuantityChange(
                                  e.target.value,
                                  product.name
                                )
                              }
                              ref={register}
                            />
                          </Form.Group>
                        </Col>
                      </td>
                      <td className="align-middle">
                        <RiDeleteBin2Line
                          size="1.5em"
                          style={{ cursor: "pointer" }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Container className="p-0">
                <Row>
                  <Col>
                    <h3 className="display-4">Total: $99.69</h3>
                  </Col>
                  <Col
                    xs
                    lg="3"
                    className="d-flex justify-content-end align-items-center"
                  >
                    <Button
                      variant="dark"
                      className="mr-3"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button variant="success">Save</Button>
                  </Col>
                </Row>
              </Container>
            </Form>
          ) : (
            error
          )}
        </Card.Body>
      </Card>
    </>
  );
}
