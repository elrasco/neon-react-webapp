import React, { Component } from "react";
import { Flex } from "reflexbox";
import { Link } from "react-router-dom";
import "./index.css";
import FilterPages from "./../FilterPages";
import { observer } from "mobx-react";

@observer
class FilterPeriod extends Component {
  constructor(props) {
    super(props);
    this.areFiltersShown = false;
    localStorage.setItem("VISIBLE-FILTERS", JSON.stringify(this.areFiltersShown));
    this.state = { today: "", yesterday: "", sevenD: "", thirtyD: "", videos: "", posts: "", period: "today", type: "v", showFilters: "" };
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
    console.log("---------------------", this.props);
    const toggleFilters = () => {
      this.areFiltersShown = !this.areFiltersShown;
      localStorage.setItem("VISIBLE-FILTERS", JSON.stringify(this.areFiltersShown));
      this.areFiltersShown ? this.setState({ showFilters: "highlighted" }) : this.setState({ showFilters: "" });
    };
    return (
      <Flex>
        <Flex className="filterBox" justify="center">
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
          <div className={this.state.videos + " first_period"}>
            <Link to={"/listing/v/" + this.props.period}>Videos</Link>
          </div>
          <div className={this.state.posts}>
            <Link to={"/listing/p/" + this.props.period}>Posts</Link>
          </div>
          <div className={this.state.showFilters + " moreFilters"}>
            <div onClick={toggleFilters}>More filters</div>
          </div>
        </Flex>
        <Flex>{this.state.showFilters && <FilterPages />}</Flex>
      </Flex>
    );
  }
}

export default FilterPeriod;
