import React, { Component } from "react";
import { Flex } from "reflexbox";
import "./index.css";
import { observer, inject } from "mobx-react";
import queryString from "query-string";

@inject("listingStore")
@observer
class SearchPages extends Component {
  selected = [];
  handleChange = option => {
    this.selected = this.props.listingStore.filters.selectedPages;
    if (option.target.value !== "null") {
      this.selected.push(option.target.value);
    }
    this.props.listingStore.changeFilters({ selectedPages: this.selected });
    console.log(this.props.listingStore.filters.selectedPages.filter(p => !!p));
    this.props.listingStore.history.push(window.location.pathname + "?" + queryString.stringify({ pages: this.props.listingStore.filters.selectedPages }));
  };
  removeFilter = pageId => {
    let pagesFromQueryString = queryString.parse(window.location.search).pages.split(",");
    pagesFromQueryString.splice(pagesFromQueryString.findIndex(p => p === pageId), 1);
    const newSearch = "pages=" + pagesFromQueryString.toString();
    this.props.listingStore.history.push(window.location.pathname + "?" + newSearch);
    this.props.listingStore.filters.selectedPages.splice(pagesFromQueryString.findIndex(p => p === pageId), 1);
  };
  getName = pageId => {
    if (this.props.listingStore.pages) {
      return this.props.listingStore.pages.find(page => page.objectId === pageId).name;
    }
  };

  render() {
    if (this.props.listingStore.pages) {
      this.pagesObj = this.props.listingStore.pages;
      this.pages = this.props.listingStore.pages.filter(p => p !== undefined).map(page => {
        return (
          <option key={page.objectId} value={page.objectId} id={page.name}>
            {page.name}
          </option>
        );
      });
    }
    const selectedPages = this.props.listingStore.filters.selectedPages.map(page => {
      const pageName = this.getName(page);

      return (
        <Flex className="tag" key={page} justify="center">
          {" "}
          {pageName} <i className="fa fa-times" aria-hidden="true" onClick={() => this.removeFilter(page)} />
        </Flex>
      );
    });

    return (
      <Flex className="SearchPages" column align="start">
        <Flex>
          <Flex style={{ marginRight: "15px" }}>Select a page</Flex>
          <select onChange={this.handleChange}>
            <option value="null">None</option>
            {this.pages}
          </select>
        </Flex>
        {this.props.listingStore.filters.selectedPages.length > 0 && (
          <Flex align="start" justify="center" className="tags">
            {selectedPages}{" "}
          </Flex>
        )}
      </Flex>
    );
  }
}

export default SearchPages;
