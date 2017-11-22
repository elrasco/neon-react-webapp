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
    return { name: page.name, objectId: page.objectId, fan_count: page.fan_count, checked: false, country: page.fans_country };
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
  @observable categories = [];
  @observable countries = [];
  checkedCategories = [];
  checkedCountries = [];
  constructor() {
    Pages.getAll()
      .then(shrinkPages)
      .then(sortByName)
      .then(res => {
        return (this.pages = res);
      });
  }
  // general methods
  capitalize = s =>
    s
      .toLowerCase()
      .split(/\s+/)
      .map(w => w[0].toUpperCase() + w.slice(1))
      .join(" ");

  extractCategories = data => {
    this.checkedCategories = this.getSelectedCategories();

    this.categories = Array.from(new Set(data.map(data => data.video.content_category)))
      .map(cat => {
        return {
          id: cat,
          descr: this.capitalize(cat.split("_").join(" ")),
          checked: this.checkedCategories.includes(cat)
        };
      })
      .sort((c1, c2) => {
        if (c2.descr < c1.descr) return 1;
        return -1;
      });
  };
  getMax = (countries, fanbase) => {
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
  attachMainCountry = videos => {
    let countries = [];
    videos.map(video => {
      const page = this.pages.find(page => page.objectId === video.page_id);
      let allCountries = Object.assign({}, page.country);
      if (page.country) {
        this.firstMax = this.getMax(page.country, video.page_fan);
        delete allCountries[this.firstMax.country_max];
        this.secondMax = this.getMax(allCountries, video.page_fan);

        video.country = [
          { id: this.firstMax.country_max, percentage: this.firstMax.percentage, descr: this.firstMax.country_max },
          { id: this.secondMax.country_max, percentage: this.secondMax.percentage, descr: this.secondMax.country_max }
        ];
        countries.push(this.firstMax.country_max);
      }
      return video;
    });
    this.countries = [
      { id: "IT", descr: "Italy", checked: this.getSelectedCountries().includes("IT") },
      { id: "DE", descr: "Germany", checked: this.getSelectedCountries().includes("Germany") },
      { id: "ES", descr: "Spain", checked: this.getSelectedCountries().includes("Spain") },
      { id: "FR", descr: "France", checked: this.getSelectedCountries().includes("France") },
      { id: "GB", descr: "UK", checked: this.getSelectedCountries().includes("UK") },
      { id: "US", descr: "USA", checked: this.getSelectedCountries().includes("USA") }
    ];
    return videos;
  };

  // actions
  @action
  changeFilters = (filters, fetch = true) => {
    this.filters = Object.assign({}, this.filters, filters);
    if (fetch) this.fetch();
  };

  @action
  checkCategory = catId => {
    this.toggleCategory(catId);
    this.previews = this.total_previews
      .filter(this.byCountry)
      .filter(this.byCategories)
      .slice(0, 39);
  };
  @action
  checkCountry = country => {
    this.toggleCountry(country);
    this.checkedCountries = this.countries.filter(c => c.checked === true).map(c => c.id);
    this.previews = this.total_previews
      .filter(this.byCountry)
      .filter(this.byCategories)
      .slice(0, 39);
    this.extractCategories(this.total_previews.filter(f => this.byCountry(f)));
  };
  toggleCategory = catId => {
    const index = this.categories.findIndex(cat => cat.id === catId);
    this.categories[index].checked = !this.categories[index].checked;
  };

  toggleCountry = country => {
    const index = this.countries.findIndex(c => c.id === country);
    this.countries[index].checked = !this.countries[index].checked;
  };
  getSelectedCountries = () => {
    return this.countries.filter(country => country.checked === true).map(c => c.id);
  };
  getSelectedCategories = () => {
    return this.categories.filter(c => c.checked === true).map(c => c.id);
  };
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
    const period = this.filters.period;
    const type = this.filters.type === "v" ? "Videos" : "Posts";
    let sort = ["shares_diff_normalized", "likes_diff_normalized", "comments_diff_normalized", "reactions_diff_normalized"];
    const weight = this.filters.weight * 2;
    this.loader = true;
    if (this.filters.selectedPages.length === 0) {
      fetch(process.env.REACT_APP_API_URL + "/api/" + period + type + "?sort=" + sort[Number(this.filters.sort) - 1] + "&w=" + weight + "&limit=1000")
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
