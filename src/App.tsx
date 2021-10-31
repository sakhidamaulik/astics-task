import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { LoginComponent } from "./components/LoginComponent";
import { ProtectedRoute } from "./protected.route";
import { NotFoundComponent } from "./components/NotFoundComponent";
import store from "./redux/store";
import { ProductsDashboard } from "./components/ProductsDashboard";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={LoginComponent} />
            <ProtectedRoute
              exact
              path="/products"
              component={ProductsDashboard}
            />
            <Route path="*" component={NotFoundComponent} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
