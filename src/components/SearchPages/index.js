import React, { Component } from "react";
import { Flex } from "reflexbox";
import "./index.css";
import { observer, inject } from "mobx-react";
import queryString from "query-string";
import Pages from "../../services/Pages";

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
    this.props.listingStore.history.push(window.location.pathname + "?" + queryString.stringify({ pages: this.props.listingStore.filters.selectedPages }));
    document.getElementById("default").selected = "selected";
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
  addPage = () => {
    const pageUrl = document.getElementById("pageUrl").value;
    return Pages.addPage(pageUrl).then(() => {
      return (document.getElementById("pageUrl").value = "");
    });
  };

  render() {
    if (this.props.listingStore.pages) {
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
        <Flex align="center">
          <Flex style={{ marginRight: "10px" }}>Filter by page</Flex>
          <select onChange={this.handleChange} defaultValue={"null"}>
            <option id="default" value="null">
              Choose a page
            </option>
            {this.pages}
          </select>
          <Flex className="newPage" align="center">
            <Flex>Add a new page url</Flex>
            <input id="pageUrl" type="text" placeholder="example: https://www.facebook.com/new_facebook_page" />
            <div className="addPage" onClick={this.addPage.bind(this)}>
              Done
            </div>
          </Flex>
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
