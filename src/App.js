import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Listing from "./components/Listing";
import Detail from "./components/Detail";
import { Provider } from "mobx-react";
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Switch>
              <Redirect exact from="/" to="/listing/v/today" />
            </Switch>
            <Route exact={true} path={"/listing/:type/:period"} component={Listing} />
            <Route exact={true} path={"/detail/:type/:objectId"} component={Detail} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
