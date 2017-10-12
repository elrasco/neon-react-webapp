const rewireMobX = require("react-app-rewire-mobx");

/* config-overrides.js */
module.exports = function override(config, env) {
  config = rewireMobX(config, env);
  if (env === "development") {
    process.env.REACT_APP_API_URL = "http://localhost:1337";
  } else {
    process.env.REACT_APP_API_URL = "http://52.58.109.69:8080";
  }
  return config;
};
