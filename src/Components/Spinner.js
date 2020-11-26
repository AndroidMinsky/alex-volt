import React from "react";
import { Spinner as SpinnerElement } from "react-bootstrap";

export default function Spinner() {
  return (
    <div className="d-flex justify-content-center mb-4">
      <SpinnerElement animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </SpinnerElement>
    </div>
  );
}
