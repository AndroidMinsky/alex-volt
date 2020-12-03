import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Header from "./Components/Header";
import Invoices from "./features/invoices/Invoices";
import Products from "./features/products/Products";
import Customers from "./features/customers/Customers";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Container>
          <Header />

          <Switch>
            <Route path="/products">
              <Products />
            </Route>
            <Route path="/customers">
              <Customers />
            </Route>
            <Route path="/">
              <Invoices />
            </Route>
          </Switch>
        </Container>
      </Router>
    </HelmetProvider>
  );
}

export default App;
