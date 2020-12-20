import React, { useState, useEffect, useMemo } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleInvoice, selectSingleInvoice } from "./singleInvoiceSlice";
import { selectProducts } from "../products/productsSlice";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import produce from "immer";

import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { RiDeleteBin2Line } from "react-icons/ri";
import Spinner from "../../Components/Spinner";
import CustomersDropdown from "../../Components/CustomersDropdown";
import ProductsDropdown from "../../Components/ProductsDropdown";

export default function EditInvoices() {
  let history = useHistory();
  const dispatch = useDispatch();

  const { id } = useParams();
  const { register, handleSubmit } = useForm();
  const { invoice, loading, error } = useSelector(selectSingleInvoice);
  const { products } = useSelector(selectProducts);

  const [discount, setDiscount] = useState("");
  const [customer, setCustomer] = useState("");
  const [productsList, setProductsList] = useState("");

  useEffect(() => {
    dispatch(fetchSingleInvoice(id));
  }, [dispatch, id]);

  useEffect(() => {
    setDiscount(invoice.discount);
  }, [invoice.discount]);

  useEffect(() => {
    setCustomer(invoice.customerName);
  }, [invoice.customerName]);

  useEffect(() => {
    setProductsList(invoice.products);
  }, [invoice.products]);

  const totalPrice = useMemo(() => {
    if (productsList) {
      const productsPrice = productsList
        .map((product) => product.price)
        .reduce((a, b) => a + b);
      return (productsPrice - (productsPrice * discount) / 100).toFixed(2);
    }
  }, [discount, productsList]);

  const handleCancel = () => {
    history.goBack();
  };

  const handleQuantityChange = (value, name, index) => {
    const newPrice =
      products.find((product) => product.name === name).price * value;

    setProductsList(
      produce((draft) => {
        draft[index].price = newPrice;
        draft[index].quantity = +value;
      })
    );
  };

  const handleAddProduct = (productName) => {
    const id = nanoid();
    if (productName) {
      const product = products.find((product) => product.name === productName);
      const productToAdd = (({ name, price }) => ({
        id: id,
        name,
        price,
        quantity: 1,
      }))(product);

      setProductsList(
        produce((draft) => {
          draft.push(productToAdd);
        })
      );
    }
  };

  const handleDeleteProduct = (id) => {
    setProductsList(
      produce((draft) => {
        const index = draft.findIndex((product) => product.id === id);
        draft.splice(index, 1);
      })
    );
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Helmet>
        <title>Invoice List - Edit Invoice</title>
      </Helmet>
      <Card>
        <Card.Body>
          <Card.Title className="mr-4 mb-4 display-4">Edit Invoice</Card.Title>
          {loading && <Spinner />}
          {!loading && error && (
            <Alert variant="danger">
              <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
              <p>
                Something went terribly wrong! Please{" "}
                <Alert.Link onClick={handleCancel}>go back</Alert.Link>.
              </p>
            </Alert>
          )}
          {!loading && !error && productsList && invoice && (
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Col sm={3} className="p-0">
                <Form.Group>
                  <Form.Label>Discount (%)</Form.Label>
                  <Form.Control
                    placeholder="Discount"
                    name="discount"
                    type="number"
                    defaultValue={discount}
                    ref={register}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col sm={6} className="p-0">
                <CustomersDropdown customer={customer} register={register} />
              </Col>

              <Col sm={6} className="p-0">
                <ProductsDropdown
                  products={products}
                  addProduct={handleAddProduct}
                />
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
                  {productsList.map((product, index) => (
                    <tr key={product.id}>
                      <td className="align-middle" ref={register}>
                        {product.name}
                      </td>
                      <td className="align-middle" ref={register}>
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="align-middle">
                        <Col sm={4} className="p-0">
                          <Form.Group className="m-0">
                            <Form.Label srOnly>Quantity</Form.Label>
                            <Form.Control
                              placeholder="Quantity"
                              name="Quantity"
                              type="number"
                              ref={register}
                              defaultValue={product.quantity}
                              onChange={(e) =>
                                handleQuantityChange(
                                  e.target.value,
                                  product.name,
                                  index
                                )
                              }
                            />
                          </Form.Group>
                        </Col>
                      </td>
                      <td className="align-middle">
                        <RiDeleteBin2Line
                          size="1.5em"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDeleteProduct(product.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Container className="p-0">
                <Row>
                  <Col>
                    <h3 className="display-4">Total: ${totalPrice}</h3>
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
                    <Button variant="success" type="submit">
                      Save
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Form>
          )}
        </Card.Body>
      </Card>
    </>
  );
}
