import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
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
  const { register, watch } = useForm();

  const watchProduct = watch("addProduct");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddProduct = () => {
    if (watchProduct && watchProduct !== "0") {
      const product = products.find((product) => product.name === watchProduct);
      const productToAdd = (({ name, price }) => ({
        name,
        price,
        quantity: 1,
      }))(product);
      addProduct(productToAdd, false);
    }
  };

  return (
    <Form.Group>
      <Form.Label>Add Product</Form.Label>
      <InputGroup>
        <Form.Control
          as="select"
          name="addProduct"
          defaultValue="0"
          ref={register}
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
            onClick={handleAddProduct}
          >
            Add
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form.Group>
  );
}
