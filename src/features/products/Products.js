import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, selectProducts } from "./productsSlice";
import { Helmet } from "react-helmet-async";

import Spinner from "../../Components/Spinner";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

export default function Products() {
  const { products, loading, error } = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Product List</title>
      </Helmet>
      <Card>
        <Card.Body>
          <Card.Title className="d-inline-block mr-4 display-4">
            Product List
          </Card.Title>
          <Button variant="outline-dark" className="align-text-bottom">
            Create
          </Button>

          {loading && <Spinner />}

          {!loading && !error && (
            <Table striped hover className="mt-4">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="align-middle">{product.id}</td>
                    <td className="align-middle">{product.name}</td>
                    <td className="align-middle">${product.price}</td>
                    <td>
                      <Button variant="outline-dark">Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </>
  );
}
