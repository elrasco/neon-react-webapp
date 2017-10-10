import React, { Component } from "react";
import { Flex } from "reflexbox";
import { Link } from "react-router-dom";
import "./index.css";
class FilterPeriod extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  render() {
    return (
      <Flex className="filterBox" justify="center">
        <div>
          <Link to="/listing/v/today">Today</Link>
        </div>
        <div>
          <Link to="/listing/v/yesterday">Yesterday</Link>
        </div>
        <div>
          <Link to="/listing/v/sevenD">Last 7 days</Link>
        </div>
        <div>
          <Link to="/listing/v/thirtyD">Last 30 days</Link>
        </div>
      </Flex>
    );
  }
}

export default FilterPeriod;
