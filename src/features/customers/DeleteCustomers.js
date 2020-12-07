import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCustomerById, removeCustomer } from "./customersSlice";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function DeleteCustomers(props) {
  const dispatch = useDispatch();
  const customer = useSelector((state) => selectCustomerById(state, props));

  const onDelete = () => {
    dispatch(removeCustomer(props.id));
    props.handleClose();
  };

  return (
    <>
      {customer && (
        <Modal show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Customer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete the customer {customer.name}?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" onClick={props.handleClose}>
              Close
            </Button>
            <Button variant="danger" type="submit" onClick={onDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
