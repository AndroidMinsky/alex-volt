import React from "react";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import { createCustomer } from "./customersSlice";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function CreateCustomers(props) {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const id = nanoid();
    dispatch(createCustomer({ ...data, id: id }));
    props.handleClose();
  };

  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>Create Customer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control placeholder="Name" name="name" ref={register} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Billing Address</Form.Label>
              <Form.Control
                placeholder="Billing Address"
                name="address"
                ref={register}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                placeholder="Phone Number"
                name="phone"
                ref={register}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" onClick={props.handleClose}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Create
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
