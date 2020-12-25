import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  selectProducts,
} from "../features/products/productsSlice";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

export default function ProductsDropdown({ addProduct }) {
  const dispatch = useDispatch();
  const { products } = useSelector(selectProducts);
  const [productToAdd, setProductToAdd] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Form.Group>
      <Form.Label>Add Product</Form.Label>
      <InputGroup>
        <Form.Control
          as="select"
          name="products"
          defaultValue="0"
          onChange={(e) => setProductToAdd(e.target.value)}
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
            onClick={() => addProduct(productToAdd)}
          >
            Add
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form.Group>
  );
}
