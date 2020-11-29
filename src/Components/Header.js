import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={NavLink} to="/">
        Invoice App
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={NavLink} exact to="/" activeClassName="active">
          Invoices
        </Nav.Link>
        <Nav.Link as={NavLink} to="/products">
          Products
        </Nav.Link>
        <Nav.Link as={NavLink} to="/customers">
          Customers
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}
