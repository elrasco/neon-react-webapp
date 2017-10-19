import React, { Component } from "react";
import { Flex } from "reflexbox";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import "./index.css";
import FilterPages from "./../FilterPages";
import { observer, inject } from "mobx-react";
import queryString from "query-string";

@inject("store")
@observer
class FilterBar extends Component {
  componentDidMount(nextProps) {
    this.props.type === "video" ? this.props.store.changeFilters({ type: "v" }) : this.props.store.changeFilters({ type: "p" });
  }
  toggleFilters = () => {
    this.props.store.showPagesFilters = !this.props.store.showPagesFilters;
    if (this.props.store.showPagesFilters === false) {
      this.props.store.filters.selectedPages = queryString.parse(window.location.search).pages.split(",");
    }
  };

  removeFilter = pageId => {
    let pagesFromQueryString = queryString.parse(window.location.search).pages.split(",");
    pagesFromQueryString.splice(pagesFromQueryString.findIndex(p => p === pageId), 1);
    let newSearch = "pages=" + pagesFromQueryString.toString();
    this.props.store.history.push(window.location.pathname + "?" + newSearch);
  };
  render() {
    if (this.props.store.pages) {
      this.tags = this.props.store.pages
        .filter(page =>
          queryString
            .parse(window.location.search)
            .pages.split(",")
            .some(tag => tag === page.objectId)
        )
        .map(page => {
          return (
            <Flex key={page.objectId}>
              <div>{page.name}</div>
              <div onClick={() => this.removeFilter(page.objectId)}>
                <i className="fa fa-times" aria-hidden="true" />
              </div>
            </Flex>
          );
        });
    }

    return (
      <Flex column>
        <Flex className="filterBox" justify="center">
          <div className={this.props.store.filters.period === "today" ? "highlighted" : ""}>
            <Link to={"/listing/" + this.props.store.filters.type + "/today" + window.location.search}>Today</Link>
          </div>
          <div className={this.props.store.filters.period === "yesterday" ? "highlighted" : ""}>
            <Link to={"/listing/" + this.props.store.filters.type + "/yesterday" + window.location.search}>Yesterday</Link>
          </div>
          <div className={this.props.store.filters.period === "sevenD" ? "highlighted" : ""}>
            <Link to={"/listing/" + this.props.store.filters.type + "/sevenD" + window.location.search}>Last 7 days</Link>
          </div>
          <div className={this.props.store.filters.period === "thirtyD" ? "highlighted" : ""}>
            <Link to={"/listing/" + this.props.store.filters.type + "/thirtyD" + window.location.search}>Last 30 days</Link>
          </div>
          <div className={this.props.store.filters.type === "v" ? "highlighted first_period" : "first_period"}>
            <Link to={"/listing/v/" + this.props.period + window.location.search}>Videos</Link>
          </div>
          <div className={this.props.store.filters.type === "p" ? "highlighted" : ""}>
            <Link to={"/listing/p/" + this.props.period + window.location.search}>Posts</Link>
          </div>
          <div className={this.props.store.showPagesFilters ? "highlighted moreFilters" : "moreFilters"}>
            <div onClick={this.toggleFilters}>More filters</div>
          </div>
        </Flex>
        <Flex column>
          <Flex className="tagsContainer" justify="center" wrap>
            {this.tags}
          </Flex>
          <FilterPages />
        </Flex>
      </Flex>
    );
  }
}

export default FilterBar;
