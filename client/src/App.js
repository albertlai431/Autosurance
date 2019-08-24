import React from "react";

// Redux
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

// Styling
import "./App.css";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// Components
import Header from "./components/layout/Header";
import Landing from "./components/layout/Landing";
import Form from "./components/form/Form";
import Collision from "./components/form/CollisionForm";
import Dashboard from "./components/Dashboard/Dashboard";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <div>
              <Route exact path="/" component={Landing} />
              <Route exact path="/form" component={Form} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/collision" component={Collision} />
            </div>
          </Switch>

          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
