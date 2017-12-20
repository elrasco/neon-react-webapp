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
const filterByPageName = pages => {
  return pages.filter(page => page.name);
};
const shrinkPages = pages => {
  return pages.map(page => {
    return { name: page.name, objectId: page.objectId, fan_count: page.fan_count, checked: false, country: page.fans_country, id: page.id };
  });
};

const capitalize = s =>
  s
    .toLowerCase()
    .split(/\s+/)
    .map(w => w[0].toUpperCase() + w.slice(1))
    .join(" ");

const orderByName = array => {
  return array.sort((c1, c2) => {
    if (c2.descr < c1.descr) return 1;
    return -1;
  });
};
const getMax = (countries, fanbase) => {
  let country_max = "";
  let percentage = "";
  let max = 0;
  Object.keys(countries).forEach(k => {
    if (countries[k] > max) {
      max = countries[k];
      country_max = k;
      percentage = Math.round(countries[k] / fanbase * 100);
    }
  });
  return { country_max, percentage };
};
const toggle = (item, array) => {
  const index = array.findIndex(c => c.id === item);
  array[index].checked = !array[index].checked;
};

class ListingStore {
  // variables
  @observable pages;
  @observable categories = [];
  @observable countries = [];
  @observable filters = { type: "", period: "", sort: "", selectedPages: [], weight: 1 };
  @observable previews = [];
  @observable loader;
  @observable history;
  @observable showPagesFilters = false;
  checkedCategories = [];
  checkedCountries = [];
  constructor() {
    Pages.getAll()
      .then(shrinkPages)
      .then(filterByPageName)
      .then(sortByName)
      .then(res => (this.pages = res));

    setInterval(() => {
      Pages.getAll()
        .then(shrinkPages)
        .then(filterByPageName)
        .then(sortByName)
        .then(res => (this.pages = res));
    }, 60000);

    this.countries = [
      { id: "IT", descr: "Italy", checked: this.getSelectedCountries().includes("IT") },
      { id: "DE", descr: "Germany", checked: this.getSelectedCountries().includes("DE") },
      { id: "ES", descr: "Spain", checked: this.getSelectedCountries().includes("ES") },
      { id: "FR", descr: "France", checked: this.getSelectedCountries().includes("FR") },
      { id: "GB", descr: "UK", checked: this.getSelectedCountries().includes("GB") },
      { id: "US", descr: "USA", checked: this.getSelectedCountries().includes("US") }
    ];
  }
  // actions
  @action
  changeFilters = (filters, fetch = true) => {
    this.filters = Object.assign({}, this.filters, filters);
    if (fetch) this.fetch();
  };

  @action
  checkCategory = catId => {
    toggle(catId, this.categories);
    this.previews = this.total_previews
      .filter(this.byCountry)
      .filter(this.byCategories)
      .slice(0, 39);
  };
  @action
  checkCountry = country => {
    toggle(country, this.countries);
    this.checkedCountries = this.getSelectedCountries();
    this.previews = this.total_previews
      .filter(this.byCountry)
      .filter(this.byCategories)
      .slice(0, 39);
    this.extractCategories(this.total_previews.filter(f => this.byCountry(f)));
  };

  // general methods
  extractCategories = data => {
    this.checkedCategories = this.getSelectedCategories();
    this.categories = orderByName(
      Array.from(new Set(data.map(data => data.video.content_category))).map(cat => {
        return {
          id: cat,
          descr: capitalize(cat.split("_").join(" ")),
          checked: this.checkedCategories.includes(cat)
        };
      })
    );
  };

  attachMainCountry = videos => {
    return videos.filter(video => this.pages.find(page => page.objectId === video.page_id)).map(video => {
      const page = this.pages.find(page => page.objectId === video.page_id);
      if (page.country) {
        let allCountries = Object.assign({}, page.country);
        this.firstMax = getMax(page.country, video.page_fan);
        delete allCountries[this.firstMax.country_max];
        this.secondMax = getMax(allCountries, video.page_fan);
      }
      video.country = [
        { id: this.firstMax.country_max, percentage: this.firstMax.percentage, descr: this.firstMax.country_max },
        { id: this.secondMax.country_max, percentage: this.secondMax.percentage, descr: this.secondMax.country_max }
      ];
      return video;
    });
  };

  getSelectedCountries = () => this.countries.filter(country => country.checked === true).map(c => c.id);
  getSelectedCategories = () => this.categories.filter(c => c.checked === true).map(c => c.id);

  byCountry = p => {
    this.checkedCountries = this.getSelectedCountries();
    if (this.checkedCountries.length > 0) {
      return p.country.some(c => this.checkedCountries.includes(c.id));
    }
    return true;
  };

  byCategories = p => {
    const selectedCategories = this.getSelectedCategories();
    if (selectedCategories.length > 0) {
      return selectedCategories.includes(p.video.content_category);
    }
    return true;
  };

  fetch = () => {
    const { period, weight } = this.filters;
    const type = this.filters.type === "v" ? "Videos" : "Posts";
    const sort = ["shares_diff_normalized", "likes_diff_normalized", "comments_diff_normalized", "reactions_diff_normalized"];
    let pagesRequired = "";
    this.loader = true;

    if (this.filters.selectedPages.length !== 0) pagesRequired = "/byPages/" + this.filters.selectedPages.join(",");
    fetch(process.env.REACT_APP_API_URL + "/api/" + period + type + pagesRequired + "?sort=" + sort[Number(this.filters.sort) - 1] + "&w=" + weight * 2 + "&limit=1000")
      .then(response => response.json())
      .then(this.attachMainCountry)
      .then(response => {
        this.total_previews = response;
        if (this.checkedCategories.length > 0 || this.checkedCountries.length > 0) {
          this.previews = this.total_previews
            .filter(this.byCountry)
            .filter(this.byCategories)
            .slice(0, 39);
          this.extractCategories(this.total_previews.filter(this.byCountry).filter(this.byCategories));
        } else {
          this.previews = this.total_previews.slice(0, 39);
          this.extractCategories(this.total_previews);
        }
      })
      .then(() => (this.loader = false));
  };
}
export default new ListingStore();
