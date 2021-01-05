import { Switch, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Header from "./Components/Header";
import Invoices from "./features/invoices/Invoices";
import EditInvoices from "./features/invoices/EditInvoices";
import Products from "./features/products/Products";
import Customers from "./features/customers/Customers";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <HelmetProvider>
      <Container>
        <Header />
        <Switch>
          <Route exact path="/" children={<Invoices />} />
          <Route path="/products" children={<Products />} />
          <Route path="/customers" children={<Customers />} />
          <Route path="/invoices/:id/edit" children={<EditInvoices />} />
        </Switch>
      </Container>
    </HelmetProvider>
  );
}

export default App;
