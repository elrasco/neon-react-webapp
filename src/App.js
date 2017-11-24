import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Listing from "./components/Listing";
import Detail from "./components/Detail";
import Settings from "./components/Settings";
import { Provider } from "mobx-react";
import listingStore from "./stores/ListingStore";
import settingsStore from "./stores/SettingsStore";
import Header from "./components/Header";

const stores = {
  listingStore,
  settingsStore
};

class App extends Component {
  render() {
    return (
      <Provider {...stores}>
        <Router>
          <div>
            <Header />
            <Switch>
              <Redirect exact from="/" to="/listing/v/today/1/1" />
            </Switch>
            <Route exact={true} path={"/listing/:type/:period/:sort/:w"} search="?pages=:data" component={Listing} />
            <Route exact={true} path={"/detail/:type/:objectId"} component={Detail} />
            <Route exact={true} path={"/settings"} component={Settings} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
