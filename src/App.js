import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Listing from "./components/Listing";
import Detail from "./components/Detail";

class App extends Component {
  render() {
    console.log(process.env);
    return (
      <Router>
        <div>
          <Route exact={true} path={"/"} component={Home} />
          <Route exact={true} path={"/listing/:type/:period"} component={Listing} />
          <Route exact={true} path={"/detail/:type/:objectId"} component={Detail} />
        </div>
      </Router>
    );
  }
}

export default App;
