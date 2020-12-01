import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectCustomerById } from "./customersSlice";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function EditCustomers(props) {
  const { register, handleSubmit } = useForm();
  const customer = useSelector((state) => selectCustomerById(state, props));

  const onSubmit = (data) => {
    props.handleClose();
  };

  return (
    <>
      {customer && (
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
              <Button variant="dark" onClick={props.handleClose}>
                Close
              </Button>
              <Button variant="success" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      )}
    </>
  );
}
