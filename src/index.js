import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { IntlProvider } from "react-intl";
import PagesProvider from "./components/PagesProvider";

ReactDOM.render(
  <PagesProvider>
    <IntlProvider locale="en">
      <App />
    </IntlProvider>
  </PagesProvider>,
  document.getElementById("root")
);
registerServiceWorker();
