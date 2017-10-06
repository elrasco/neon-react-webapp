import React, { Component } from "react";
import { Flex } from "reflexbox";
import Pages from "../../services/Pages";

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
      const pages = this.state.pages;
      const index = pages.findIndex(page => page.objectId === pageId);
      pages[index].checked = !pages[index].checked;
      console.log(pages);
      return pages;
    };

    const checkAndWriteFilters = () => {
      this.checkedPages = this.state.pages.filter(page => page.checked === true).map(page => page.objectId);
      writeOnStorage(this.checkedPages);
    };

    const pages = this.state.pages.map(page => {
      return (
        <Flex key={page.objectId} align="start">
          <label>
            <input name={page.objectId} type="checkbox" checked={this.state[page.objectId]} onChange={handleInputChange} />
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
        <button style={{ margin: "15px" }} onClick={checkAndWriteFilters}>
          Apply filters
        </button>
      </div>
    );
  }
}

export default FilterBar;
