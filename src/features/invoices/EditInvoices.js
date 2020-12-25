import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleInvoice, selectSingleInvoice } from "./singleInvoiceSlice";
import { Helmet } from "react-helmet-async";

import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import Spinner from "../../Components/Spinner";
import InvoiceForm from "./InvoiceForm";

export default function EditInvoices() {
  const dispatch = useDispatch();
  let history = useHistory();
  const { id } = useParams();
  const { invoice, loading, error } = useSelector(selectSingleInvoice);

  useEffect(() => {
    dispatch(fetchSingleInvoice(id));
  }, [dispatch, id]);

  return (
    <>
      <Helmet>
        <title>Invoice List - Edit Invoice</title>
      </Helmet>
      <Card>
        <Card.Body>
          <Card.Title className="mr-4 mb-4 display-4">Edit Invoice</Card.Title>
          {error && (
            <Alert variant="danger">
              <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
              <p>
                Something went terribly wrong! Please{" "}
                <Alert.Link onClick={() => history.goBack()}>
                  go back
                </Alert.Link>
                .
              </p>
            </Alert>
          )}
          {loading ? <Spinner /> : <InvoiceForm invoice={invoice} />}
        </Card.Body>
      </Card>
    </>
  );
}
