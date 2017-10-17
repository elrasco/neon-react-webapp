import React, { Component } from "react";
import { Flex } from "reflexbox";
import { Link } from "react-router-dom";
import "./index.css";
import FilterPages from "./../FilterPages";
import { observer, inject } from "mobx-react";

@inject("store")
@observer
class FilterBar extends Component {
  componentDidMount(nextProps) {
    this.props.type === "video"
      ? this.props.store.changeFilters({
          type: "v",
          period: this.props.store.filters.period,
          selectedPages: this.props.store.filters.selectedPages
        })
      : this.props.store.changeFilters({
          type: "p",
          period: this.props.store.filters.period,
          selectedPages: this.props.store.filters.selectedPages
        });
  }
  render() {
    const toggleFilters = () => {
      this.props.store.setFilterApplied();
    };

    return (
      <Flex>
        <Flex className="filterBox" justify="center">
          <div className={this.props.store.filters.period === "today" ? "highlighted" : ""}>
            <Link to={"/listing/" + this.props.store.filters.type + "/today?" + this.props.store.location.search}>Today</Link>
          </div>
          <div className={this.props.store.filters.period === "yesterday" ? "highlighted" : ""}>
            <Link to={"/listing/" + this.props.store.filters.type + "/yesterday?" + this.props.store.location.search}>Yesterday</Link>
          </div>
          <div className={this.props.store.filters.period === "sevenD" ? "highlighted" : ""}>
            <Link to={"/listing/" + this.props.store.filters.type + "/sevenD?" + this.props.store.location.search}>Last 7 days</Link>
          </div>
          <div className={this.props.store.filters.period === "thirtyD" ? "highlighted" : ""}>
            <Link to={"/listing/" + this.props.store.filters.type + "/thirtyD?" + this.props.store.location.search}>Last 30 days</Link>
          </div>
          <div className={this.props.store.filters.type === "v" ? "highlighted first_period" : "first_period"}>
            <Link to={"/listing/v/" + this.props.period + "?" + this.props.store.location.search}>Videos</Link>
          </div>
          <div className={this.props.store.filters.type === "p" ? "highlighted" : ""}>
            <Link to={"/listing/p/" + this.props.period + "?" + this.props.store.location.search}>Posts</Link>
          </div>
          <div className={!this.props.store.appliedFilters ? "highlighted moreFilters" : "moreFilters"}>
            <div onClick={toggleFilters}>More filters</div>
          </div>
        </Flex>
        <Flex>{!this.props.store.appliedFilters && <FilterPages />}</Flex>
      </Flex>
    );
  }
}

export default FilterBar;
