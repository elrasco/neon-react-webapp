import React, { Component } from "react";
import { Flex } from "reflexbox";
import "./index.css";
import { observer, inject } from "mobx-react";
import queryString from "query-string";

@inject("store")
@observer
class FilterPages extends Component {
  handleInputChange = event => {
    const pageId = event.target.name;
    if (this.props.store.filters.selectedPages.some(p => p === pageId)) {
      const index = this.props.store.filters.selectedPages.findIndex(page => page === pageId);
      this.props.store.filters.selectedPages.splice(index, 1);
    } else {
      this.props.store.filters.selectedPages.push(pageId);
    }
  };
  removeFilters = () => {
    this.props.store.filters.selectedPages = [];
  };
  goTo = () => {
    this.props.store.showPagesFilters = false;
    this.props.store.history.push(window.location.pathname + "?" + queryString.stringify({ pages: this.props.store.filters.selectedPages }));
  };

  render() {
    const pages = (this.props.store.pages || []).map(page => {
      return (
        <Flex className="input-container" key={page.objectId}>
          <label>
            <input name={page.objectId} type="checkbox" checked={this.props.store.filters.selectedPages.some(p => p === page.objectId)} onChange={this.handleInputChange} />
            {page.name}
          </label>
        </Flex>
      );
    });
    return (
      <div>
        {this.props.store.showPagesFilters && (
          <div className="FilterPages">
            <Flex className="pages-container" wrap column align="start">
              {pages}
            </Flex>
            <div className="apply" onClick={this.goTo}>
              Apply
            </div>
            <Flex className="remove" onClick={this.removeFilters}>
              Remove filters
            </Flex>
          </div>
        )}
      </div>
    );
  }
}

export default FilterPages;
