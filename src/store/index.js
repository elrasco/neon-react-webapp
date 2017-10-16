import { observable, action } from "mobx";

class Store {
  @observable filters = { type: "", period: "", selectedPages: [] };
  @observable pages = [];
  @observable previews = [];

  @action
  setType = type => {
    this.filters.type = type;
    console.log("filters changed");
  };

  @action
  setPeriod = period => {
    console.log("period changed", period);
    this.filters.period = period;
  };
  @action
  setPages = pages => {
    this.pages = pages;
  };

  @action
  filterPages = pages => {
    this.filters.selectedPages = pages;
    return this.filters.selectedPages.filter(p => !!p);
  };
  @action
  updatePreviews = previews => {
    this.previews = previews;
  };
}
export default new Store();
