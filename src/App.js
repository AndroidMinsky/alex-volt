import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./Components/Header";
import Invoices from "./Components/Invoices";
import Products from "./Components/Products";
import Customers from "./Components/Customers";
import Container from "react-bootstrap/Container";

function App() {
  return (
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
  );
}

export default App;
