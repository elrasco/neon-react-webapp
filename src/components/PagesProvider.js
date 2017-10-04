import React, { Component, PropTypes, Children } from "react";

class PagesProvider extends Component {
  static propTypes = {
    GetPages: PropTypes.object.isRequired
  };
  // you must specify what you’re adding to the context
  static childContextTypes = {
    GetPages: PropTypes.object.isRequired
  };
  getChildContext() {
    return { GetPages: fetch(`${process.env.REACT_APP_API_URL}/api/pages`).then(response => response.json()) };
  }
  render() {
    // `Children.only` enables us not to add a <div /> for nothing
    return Children.only(this.props.children);
  }
}
export default PagesProvider;
