import { observable, action } from "mobx";
import Pages from "../services/Pages";

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

class Store {
  // variables
  @observable pages;
  @observable filters = { type: "", period: "", selectedPages: [] };
  @observable previews = [];
  @observable allChecked;
  @observable appliedFilters = true;
  constructor() {
    Pages.getAll()
      .then(shrinkPages)
      .then(sortByName)
      .then(res => {
        this.setAllChecked(!res.some(page => page.checked === true));
        return (this.pages = res);
      });
  }

  // actions
  @action
  changeFilters = filters => {
    this.filters = filters;
    this.fetch();
  };

  @action
  setFilterApplied = () => {
    this.appliedFilters = !this.appliedFilters;
  };
  @action
  fetch = () => {
    const period = this.filters.period;
    const type = this.filters.type === "v" ? "Videos" : "Posts";
    if (this.filters.selectedPages.length === 0) {
      fetch(process.env.REACT_APP_API_URL + "/api/" + period + type + "?limit=20")
        .then(response => response.json())
        .then(response => {
          this.previews = response;
        });
    } else {
      fetch(process.env.REACT_APP_API_URL + "/api/" + period + type + "/byPages/" + this.filters.selectedPages.join(",") + "?limit=20")
        .then(response => response.json())
        .then(response => {
          this.previews = response;
        });
    }
  };

  @action
  setAllChecked = bool => {
    this.allChecked = bool;
  };

  @action
  checkPages = pageId => {
    const index = this.pages.findIndex(page => page.objectId === pageId);
    if (pageId !== "all") {
      this.pages[index].checked = !this.pages[index].checked;
    } else {
      this.pages = this.pages.map(page => {
        page.checked = false;
        return page;
      });
      this.filters.selectedPages = this.pages;
    }
    return this.pages;
  };
}
export default new Store();
