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
          <Flex column className="filterBox">
            <Flex align="center" className={this.props.listingStore.filters.period === "today" ? "highlighted" : ""}>
              <div className="square" />
              <Link to={"/listing/" + this.props.listingStore.filters.type + "/today/" + this.props.listingStore.filters.sort + window.location.search}>Today</Link>
            </Flex>
            <Flex align="center" className={this.props.listingStore.filters.period === "yesterday" ? "highlighted" : ""}>
              <div className="square" />
              <Link to={"/listing/" + this.props.listingStore.filters.type + "/yesterday/" + this.props.listingStore.filters.sort + window.location.search}>Yesterday</Link>
            </Flex>
            <Flex align="center" className={this.props.listingStore.filters.period === "sevenD" ? "highlighted" : ""}>
              <div className="square" />
              <Link to={"/listing/" + this.props.listingStore.filters.type + "/sevenD/" + this.props.listingStore.filters.sort + window.location.search}>Last 7 days</Link>
            </Flex>
            <Flex align="center" className={this.props.listingStore.filters.period === "thirtyD" ? "highlighted" : ""}>
              <div className="square" />
              <Link to={"/listing/" + this.props.listingStore.filters.type + "/thirtyD/" + this.props.listingStore.filters.sort + window.location.search}>Last 30 days</Link>
            </Flex>
            <Flex align="center" className="orderBy">
              Order by:
            </Flex>
            {/* <div className={this.props.listingStore.showPagesFilters ? "highlighted moreFilters" : "moreFilters"}>
              <div onClick={this.toggleFilters}>More filters</div>
            </div> */}
            <Flex align="center" className={this.props.listingStore.filters.sort === "shares_diff_normalized" ? "highlighted" : ""}>
              <div className="square" />
              <Link to={"/listing/" + this.props.listingStore.filters.type + "/" + this.props.listingStore.filters.period + "/shares_diff_normalized" + window.location.search}>Shares</Link>
            </Flex>
            <Flex align="center" className={this.props.listingStore.filters.sort === "likes_diff_normalized" ? "highlighted" : ""}>
              <div className="square" />
              <Link to={"/listing/" + this.props.listingStore.filters.type + "/" + this.props.listingStore.filters.period + "/likes_diff_normalized" + window.location.search}>Likes</Link>
            </Flex>
            <Flex align="center" className={this.props.listingStore.filters.sort === "comments_diff_normalized" ? "highlighted" : ""}>
              <div className="square" />
              <Link to={"/listing/" + this.props.listingStore.filters.type + "/" + this.props.listingStore.filters.period + "/comments_diff_normalized" + window.location.search}>Comments</Link>
            </Flex>
            <Flex align="center" className={this.props.listingStore.filters.sort === "reactions_diff_normalized" ? "highlighted" : ""}>
              <div className="square" />
              <Link to={"/listing/" + this.props.listingStore.filters.type + "/" + this.props.listingStore.filters.period + "/reactions_diff_normalized" + window.location.search}>Reactions</Link>
            </Flex>
          </Flex>
        </Flex>
        {/* <Flex column>
          <Flex className="pagesContainer" justify="center" wrap>
            {this.pages}
          </Flex>
          <FilterPages />
        </Flex> */}
      </Flex>
    );
  }
}

export default FilterBar;
