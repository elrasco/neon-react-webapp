import React, { Component } from "react";
import { Flex } from "reflexbox";
import { Link } from "react-router-dom";
import "./index.css";
class FilterPeriod extends Component {
  constructor(props) {
    super(props);
    this.state = { today: "", yesterday: "", sevenD: "", thirtyD: "", videos: "", posts: "", period: "today", type: "v" };
    this.switchPeriod = (nextProps = {}) => {
      const period = this.props.period || nextProps.period;
      switch (period) {
        case "today":
          this.setState({ today: "highlighted", yesterday: "", sevenD: "", thirtyD: "" });
          break;
        case "yesterday":
          this.setState({ today: "", yesterday: "highlighted", sevenD: "", thirtyD: "" });
          break;
        case "sevenD":
          this.setState({ today: "", yesterday: "", sevenD: "highlighted", thirtyD: "" });
          break;
        case "thirtyD":
          this.setState({ today: "", yesterday: "", sevenD: "", thirtyD: "highlighted" });
          break;
        default:
          break;
      }
    };
  }
  componentDidMount() {
    this.switchPeriod();
  }
  componentWillReceiveProps(nextProps) {
    this.switchPeriod(nextProps);
    nextProps.type === "video" ? this.setState({ type: "v", videos: "highlighted", posts: "" }) : this.setState({ type: "p", videos: "", posts: "highlighted" });
  }

  render() {
    return (
      <Flex className="filterBox" justify="center">
        <div className="title"> Period:</div>
        <div className={this.state.today}>
          <Link to={"/listing/" + this.state.type + "/today"}>Today</Link>
        </div>
        <div className={this.state.yesterday}>
          <Link to={"/listing/" + this.state.type + "/yesterday"}>Yesterday</Link>
        </div>
        <div className={this.state.sevenD}>
          <Link to={"/listing/" + this.state.type + "/sevenD"}>Last 7 days</Link>
        </div>
        <div className={this.state.thirtyD}>
          <Link to={"/listing/" + this.state.type + "/thirtyD"}>Last 30 days</Link>
        </div>
        <div className="title">Type:</div>
        <div className={this.state.videos}>
          <Link to={"/listing/v/" + this.props.period}>Videos</Link>
        </div>
        <div className={this.state.posts}>
          <Link to={"/listing/p/" + this.props.period}>Posts</Link>
        </div>
      </Flex>
    );
  }
}

export default FilterPeriod;
