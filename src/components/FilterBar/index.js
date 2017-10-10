import React, { Component } from "react";
import { Flex } from "reflexbox";
import Pages from "../../services/Pages";

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

const shrinkPages = pages => {
  return pages.map(page => {
    return { name: page.name, objectId: page.objectId, fan_count: page.fan_count, checked: false };
  });
};
const writeOnStorage = pages => {
  const enrichedPages = { pages, created: new Date().getTime() };
  localStorage.setItem("PAGES-CHECKED", JSON.stringify(enrichedPages));
};

class FilterBar extends Component {
  constructor() {
    super();
    this.state = { pages: [], allChecked: true };
    this.pages = Pages.getAll()
      .then(shrinkPages)
      .then(pages => this.setState({ pages: pages }));
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

    const applyFilters = () => {
      this.checkedPages = this.state.pages.filter(page => page.checked === true).map(page => page.objectId);
      writeOnStorage(this.checkedPages);
    };
    const pages = sortByName(this.state.pages).map(page => {
      return (
        <Flex key={page.objectId} align="start">
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
      <div>
        <Flex wrap style={{ maxHeight: "150px", margin: "15px" }} column>
          <label>
            <input name={"all"} type="checkbox" checked={this.state.allChecked} onChange={handleInputChange} />
            All
          </label>
          {pages}
        </Flex>
        <button style={{ margin: "15px" }} onClick={applyFilters}>
          Apply filters
        </button>
      </div>
    );
  }
}

export default FilterBar;
