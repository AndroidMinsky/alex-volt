import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectCustomers } from "./customersSlice";
import { customerSelector } from "./customerSelector";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function EditCustomers(props) {
  const { customers } = useSelector(selectCustomers);
  const [customer, setCustomer] = useState("");
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    setCustomer(customerSelector(customers, props));
  }, [props]);

  const onSubmit = (data) => {
    console.log(data, props.id);
    props.handleClose();
  };

  return (
    <>
      {customer && customer.id === props.id && (
        <Modal show={props.show} onHide={props.handleClose}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Customer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  placeholder="Name"
                  name="name"
                  defaultValue={customer.name}
                  ref={register}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Billing Address</Form.Label>
                <Form.Control
                  placeholder="Billing Address"
                  name="address"
                  defaultValue={customer.address}
                  ref={register}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  placeholder="Phone Number"
                  name="phone"
                  defaultValue={customer.phone}
                  ref={register}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={props.handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      )}
    </>
  );
}
