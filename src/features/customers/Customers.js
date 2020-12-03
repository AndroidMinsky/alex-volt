import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCustomers, selectCustomers } from "./customersSlice";
import { Helmet } from "react-helmet-async";

import Spinner from "../../Components/Spinner";
import EditCustomers from "./EditCustomers";
import CreateCustomers from "./CreateCustomers";
import DeleteCustomer from "./DeleteCustomers";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { RiEdit2Line, RiDeleteBin2Line } from "react-icons/ri";

export default function Customers() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [id, setId] = useState("");
  const { customers, loading, error } = useSelector(selectCustomers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = (id) => {
    setId(id);
    setShowEditModal(true);
  };

  const handleCloseCreateModal = () => setShowCreateModal(false);
  const handleShowCreateModal = () => setShowCreateModal(true);

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = (id) => {
    setId(id);
    setShowDeleteModal(true);
  };

  return (
    <>
      <Helmet>
        <title>Customer List</title>
      </Helmet>
      <Card>
        <Card.Body>
          <Card.Title className="d-inline-block mr-4 display-4">
            Customer List
          </Card.Title>
          <Button
            variant="outline-dark"
            className="align-text-bottom"
            onClick={() => handleShowCreateModal()}
          >
            Create
          </Button>

          {loading && <Spinner />}

          {!loading && !error && (
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
                {customers.map((customer, index) => (
                  <tr key={customer.id}>
                    <td className="align-middle">{index + 1}</td>
                    <td className="align-middle">{customer.name}</td>
                    <td className="align-middle">{customer.address}</td>
                    <td className="align-middle">{customer.phone}</td>
                    <td>
                      <RiEdit2Line
                        size="1.5em"
                        style={{ cursor: "pointer" }}
                        className="mr-3"
                        onClick={() => handleShowEditModal(customer.id)}
                      >
                        Edit
                      </RiEdit2Line>
                      <RiDeleteBin2Line
                        size="1.5em"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleShowDeleteModal(customer.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
      <EditCustomers
        show={showEditModal}
        handleClose={handleCloseEditModal}
        id={id}
      />
      <CreateCustomers
        show={showCreateModal}
        handleClose={handleCloseCreateModal}
      />
      <DeleteCustomer
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        id={id}
      />
    </>
  );
}
