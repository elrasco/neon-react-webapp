import React, { Component } from "react";
import { Flex } from "reflexbox";
import { Link } from "react-router-dom";
import "./index.css";
import FilterPages from "./../FilterPages";
import { observer, inject } from "mobx-react";
import queryString from "query-string";

@inject("listingStore")
@observer
class FilterBar extends Component {
  componentDidMount(nextProps) {
    this.props.type === "video" ? this.props.listingStore.changeFilters({ type: "v" }) : this.props.listingStore.changeFilters({ type: "p" });
  }
  toggleFilters = () => {
    this.props.listingStore.showPagesFilters = !this.props.listingStore.showPagesFilters;
    if (this.props.listingStore.showPagesFilters === false) {
      this.props.listingStore.filters.selectedPages = queryString.parse(window.location.search).pages.split(",");
    }
  };

  removeFilter = pageId => {
    let pagesFromQueryString = queryString.parse(window.location.search).pages.split(",");
    pagesFromQueryString.splice(pagesFromQueryString.findIndex(p => p === pageId), 1);
    let newSearch = "pages=" + pagesFromQueryString.toString();
    this.props.listingStore.history.push(window.location.pathname + "?" + newSearch);
  };
  render() {
    if (this.props.listingStore.pages && window.location.search !== "") {
      this.pages = this.props.listingStore.pages
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
      <Flex column className="filterBar">
        <Flex justify="space-between">
          <Flex column justify="center">
            <Link to={"/settings"}>
              <i className="fa fa-cog big orange" aria-hidden="true" />
            </Link>
          </Flex>
          <Flex justify="center" className="filterBox" j>
            <div className={this.props.listingStore.filters.period === "today" ? "highlighted" : ""}>
              <Link to={"/listing/" + this.props.listingStore.filters.type + "/today" + window.location.search}>Today</Link>
            </div>
            <div className={this.props.listingStore.filters.period === "yesterday" ? "highlighted" : ""}>
              <Link to={"/listing/" + this.props.listingStore.filters.type + "/yesterday" + window.location.search}>Yesterday</Link>
            </div>
            <div className={this.props.listingStore.filters.period === "sevenD" ? "highlighted" : ""}>
              <Link to={"/listing/" + this.props.listingStore.filters.type + "/sevenD" + window.location.search}>Last 7 days</Link>
            </div>
            <div className={this.props.listingStore.filters.period === "thirtyD" ? "highlighted" : ""}>
              <Link to={"/listing/" + this.props.listingStore.filters.type + "/thirtyD" + window.location.search}>Last 30 days</Link>
            </div>
            <div className={this.props.listingStore.filters.type === "v" ? "highlighted first_period" : "first_period"}>
              <Link to={"/listing/v/" + this.props.period + window.location.search}>Videos</Link>
            </div>
            <div className={this.props.listingStore.filters.type === "p" ? "highlighted" : ""}>
              <Link to={"/listing/p/" + this.props.period + window.location.search}>Posts</Link>
            </div>
            <div className={this.props.listingStore.showPagesFilters ? "highlighted moreFilters" : "moreFilters"}>
              <div onClick={this.toggleFilters}>More filters</div>
            </div>
          </Flex>
        </Flex>
        <Flex column>
          <Flex className="pagesContainer" justify="center" wrap>
            {this.pages}
          </Flex>
          <FilterPages />
        </Flex>
      </Flex>
    );
  }
}

export default FilterBar;
