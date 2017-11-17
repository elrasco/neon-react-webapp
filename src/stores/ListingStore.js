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

class ListingStore {
  // variables
  @observable pages;
  @observable filters = { type: "", period: "", sort: "", selectedPages: [], weight: 1 };
  @observable previews = [];
  @observable loader;
  @observable history;
  @observable showPagesFilters = false;
  constructor() {
    Pages.getAll()
      .then(shrinkPages)
      .then(sortByName)
      .then(res => {
        return (this.pages = res);
      });
  }

  // actions
  @action
  changeFilters = (filters, fetch = true) => {
    this.filters = Object.assign({}, this.filters, filters);
    if (fetch) this.fetch();
  };

  fetch = () => {
    const period = this.filters.period;
    const type = this.filters.type === "v" ? "Videos" : "Posts";
    let sort = ["shares_diff_normalized", "likes_diff_normalized", "comments_diff_normalized", "reactions_diff_normalized"];
    const weight = this.filters.weight * 2;
    this.loader = true;
    if (this.filters.selectedPages.length === 0) {
      fetch(process.env.REACT_APP_API_URL + "/api/" + period + type + "?sort=" + sort[Number(this.filters.sort) - 1] + "&w=" + weight + "&limit=40")
        .then(response => response.json())
        .then(response => {
          this.previews = response;
          this.loader = false;
        });
    } else {
      fetch(process.env.REACT_APP_API_URL + "/api/" + period + type + "/byPages/" + this.filters.selectedPages.join(",") + "?limit=40")
        .then(response => response.json())
        .then(response => {
          this.previews = response;
          this.loader = false;
        });
    }
  };
}
export default new ListingStore();
