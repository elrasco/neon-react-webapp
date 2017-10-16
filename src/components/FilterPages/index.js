import React, { Component } from "react";
import { Flex } from "reflexbox";
import Pages from "../../services/Pages";
import "./index.css";
import { observer, inject } from "mobx-react";

const sortByName = pages => {
  return pages.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
};
const checkTheStorage = pageId => {
  const pagesChecked = JSON.parse(localStorage.getItem("PAGES-CHECKED")).pages;
  return pagesChecked.some(page => page === pageId) ? true : false;
};
const shrinkPages = pages => {
  return pages.map(page => {
    return { name: page.name, objectId: page.objectId, fan_count: page.fan_count, checked: checkTheStorage(page.objectId) };
  });
};
const writeOnStorage = pages => {
  const enrichedPages = { pages, created: new Date().getTime() };
  localStorage.setItem("PAGES-CHECKED", JSON.stringify(enrichedPages));
  localStorage.setItem("VISIBLE-FILTERS", JSON.stringify(false));
};

@inject("store")
@observer
class FilterPages extends Component {
  constructor() {
    super();
    this.state = { pages: [], allChecked: true };
    this.pages = Pages.getAll()
      .then(shrinkPages)
      .then(pages => {
        this.props.store.setPages(pages);
        this.setState({
          pages: pages,
          allChecked: !pages.some(page => page.checked === true)
        });
      });
    this.applyFilters = this.applyFilters.bind(this);
  }

  applyFilters() {
    this.checkedPages = this.state.pages.filter(page => page.checked === true).map(page => page.objectId);
    this.props.store.filterPages(this.checkedPages);
    writeOnStorage(this.checkedPages);
  }

  render() {
    const handleInputChange = event => {
      const pageId = event.target.name;
      updatePage(pageId);
      const somethingChecked = this.state.pages.some(page => page.checked === true);
      somethingChecked === true ? this.setState({ allChecked: false }) : this.setState({ allChecked: true });
    };

    const updatePage = pageId => {
      let pages = this.state.pages;
      const index = pages.findIndex(page => page.objectId === pageId);
      if (pageId !== "all") {
        pages[index].checked = !pages[index].checked;
      } else {
        pages = pages.map(page => {
          page.checked = false;
          return page;
        });
        this.setState({ pages: pages });
      }
      return pages;
    };

    const pages = sortByName(this.state.pages).map(page => {
      return (
        <Flex className="input-container" key={page.objectId}>
          <label>
            <input
              name={page.objectId}
              type="checkbox"
              checked={this.state.pages[this.state.pages.findIndex(p => p.objectId === page.objectId)].checked}
              onChange={handleInputChange}
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
              <input name={"all"} type="checkbox" checked={this.state.allChecked} onChange={handleInputChange} />
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
