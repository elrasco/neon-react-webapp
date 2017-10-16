import React, { Component } from "react";
import { Flex } from "reflexbox";
import "./index.css";
import { observer, inject } from "mobx-react";

@inject("store")
@observer
class FilterPages extends Component {
  constructor(props) {
    super(props);
    this.applyFilters = this.applyFilters.bind(this);
  }

  applyFilters() {
    this.props.store.changeFilters({
      selectedPages: this.props.store.pages
        .filter(page => page.checked === true)
        .map(page => page.objectId)
        .filter(p => !!p),
      type: this.props.store.filters.type,
      period: this.props.store.filters.period
    });
    this.props.store.setFilterApplied();
  }

  handleInputChange = event => {
    const pageId = event.target.name;
    this.props.store.checkPages(pageId);
    const somethingChecked = this.props.store.pages.some(page => page.checked === true);
    somethingChecked === true ? this.props.store.setAllChecked(false) : this.props.store.setAllChecked(true);
  };

  render() {
    const pages = this.props.store.pages.map(page => {
      return (
        <Flex className="input-container" key={page.objectId}>
          <label>
            <input
              name={page.objectId}
              type="checkbox"
              checked={this.props.store.pages[this.props.store.pages.findIndex(p => p.objectId === page.objectId)].checked}
              onChange={this.handleInputChange}
            />
            {page.name}
          </label>
        </Flex>
      );
    });

    return (
      <div className="FilterPages">
        <Flex className="pages-container" wrap column align="start">
          <div className="input-container">
            <label>
              <input name={"all"} type="checkbox" checked={this.props.store.allChecked} onChange={this.handleInputChange} />
              All
            </label>
          </div>
          {pages}
        </Flex>
        <button className="apply" onClick={this.applyFilters}>
          Apply filters
        </button>
      </div>
    );
  }
}

export default FilterPages;
