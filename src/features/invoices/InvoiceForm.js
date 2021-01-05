import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";

import CustomersDropdown from "../../Components/CustomersDropdown";
import ProductsDropdown from "../../Components/ProductsDropdown";
import { useDispatch } from "react-redux";
import { updateInvoice } from "./invoicesSlice";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { RiDeleteBin2Line } from "react-icons/ri";

export default function InvoiceForm({ invoice }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { register, watch, control, handleSubmit } = useForm({
    defaultValues: invoice,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const discount = watch("discount");
  const products = watch("products", fields);

  const totalPrice = useMemo(() => {
    if (products.length) {
      const productsPrice = products
        .map((product) => product.price * product.quantity)
        .reduce((a, b) => a + b);
      return (productsPrice - (productsPrice * discount) / 100).toFixed(2);
    }
    return 0;
  }, [discount, products]);

  const handleCancel = () => {
    history.goBack();
  };

  const onSubmit = (data) => {
    const editedInvoice = { id: invoice.id, ...data, totalPrice };
    dispatch(updateInvoice({ id: invoice.id, newData: editedInvoice }));
    history.goBack();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Col sm={3} className="p-0">
        <Form.Group>
          <Form.Label>Discount (%)</Form.Label>
          <Form.Control
            placeholder="Discount"
            name="discount"
            type="number"
            ref={register}
          />
        </Form.Group>
      </Col>

      <Col sm={6} className="p-0">
        <CustomersDropdown register={register} />
      </Col>

      <Col sm={6} className="p-0">
        <ProductsDropdown onAddProductClick={append} />
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
          {fields.map(({ id, name, price, quantity }, index) => (
            <tr key={id}>
              <td className="align-middle">
                <Form.Group className="m-0">
                  <Form.Label srOnly>Name</Form.Label>
                  <Form.Control
                    plaintext
                    ref={register()}
                    name={`products[${index}].name`}
                    defaultValue={name}
                  />
                </Form.Group>
              </td>
              <td className="align-middle">
                <Form.Group className="m-0 form-inline">
                  <Form.Label srOnly>Price</Form.Label>
                  <InputGroup>
                    <div className="pt-2 pb-2">$</div>
                    <Form.Control
                      plaintext
                      ref={register()}
                      name={`products[${index}].price`}
                      defaultValue={price}
                    />
                  </InputGroup>
                </Form.Group>
              </td>

              <td className="align-middle">
                <Col sm={4} className="p-0">
                  <Form.Group className="m-0">
                    <Form.Label srOnly>Quantity</Form.Label>
                    <Form.Control
                      ref={register()}
                      placeholder="Quantity"
                      name={`products[${index}].quantity`}
                      type="number"
                      defaultValue={quantity}
                    />
                  </Form.Group>
                </Col>
              </td>
              <td className="align-middle">
                <RiDeleteBin2Line
                  size="1.5em"
                  style={{ cursor: "pointer" }}
                  onClick={() => remove(index)}
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
            <Button variant="dark" className="mr-3" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="success" type="submit">
              Save
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
}
