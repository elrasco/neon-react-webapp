import React, { Component } from "react";

class PageSetting extends Component {
  state = {};
  render() {
    return <div>{this.props.page.name}</div>;
  }
}

export default PageSetting;
