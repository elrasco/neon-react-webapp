import React, { Component } from "react";
import { Flex } from "reflexbox";
import { Link } from "react-router-dom";
import "./index.css";
import { observer, inject } from "mobx-react";
import queryString from "query-string";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Tooltip from "rc-tooltip";
const Handle = Slider.Handle;

@inject("listingStore")
@observer
class FilterBar extends Component {
  componentDidMount(nextProps) {
    this.props.type === "video" ? this.props.listingStore.changeFilters({ type: "v" }) : this.props.listingStore.changeFilters({ type: "p" });
  }
  toggleFilters = () => {
    this.props.listingStore.showPagesFilters = !this.props.listingStore.showPagesFilters;
    if (this.props.listingStore.showPagesFilters === false) {
      this.props.listingStore.filters.selectedPages = queryString.parse(window.location.search).pages.split(",");
    }
  };
  handle = props => {
    const { value, dragging, index, ...restProps } = props;
    return (
      <Tooltip prefixCls="rc-slider-tooltip" overlay={value} visible={dragging} placement="top" key={index}>
        <Handle value={value} {...restProps} />
      </Tooltip>
    );
  };

  onSlideChange = value => {
    this.props.listingStore.changeFilters({ weight: value }, false);
    this.props.listingStore.history.push(
      "/listing/" +
        this.props.listingStore.filters.type +
        "/" +
        this.props.listingStore.filters.period +
        "/" +
        this.props.listingStore.filters.sort +
        "/" +
        this.props.listingStore.filters.weight +
        window.location.search
    );
  };
  removeFilter = pageId => {
    let pagesFromQueryString = queryString.parse(window.location.search).pages.split(",");
    pagesFromQueryString.splice(pagesFromQueryString.findIndex(p => p === pageId), 1);
    let newSearch = "pages=" + pagesFromQueryString.toString();
    this.props.listingStore.history.push(window.location.pathname + "?" + newSearch);
  };
  render() {
    if (this.props.listingStore.pages && window.location.search !== "") {
      this.pages = this.props.listingStore.pages
        .filter(page =>
          queryString
            .parse(window.location.search)
            .pages.split(",")
            .some(tag => tag === page.objectId)
        )
        .map(page => {
          return (
            <Flex key={page.objectId}>
              <div>{page.name}</div>
              <div onClick={() => this.removeFilter(page.objectId)}>
                <i className="fa fa-times" aria-hidden="true" />
              </div>
            </Flex>
          );
        });
    }

    return (
      <Flex column className="filterBar">
        <Flex column className="period">
          <Flex className="sort_title">
            <Flex> Period range:</Flex>
          </Flex>
          <Flex align="center" className={this.props.listingStore.filters.period === "today" ? "highlighted" : ""}>
            <div className="square" />
            <Link to={"/listing/" + this.props.listingStore.filters.type + "/today/" + this.props.listingStore.filters.sort + "/" + this.props.listingStore.filters.weight + window.location.search}>
              Today
            </Link>
          </Flex>
          <Flex align="center" className={this.props.listingStore.filters.period === "yesterday" ? "highlighted" : ""}>
            <div className="square" />
            <Link
              to={"/listing/" + this.props.listingStore.filters.type + "/yesterday/" + this.props.listingStore.filters.sort + "/" + this.props.listingStore.filters.weight + window.location.search}
            >
              Yesterday
            </Link>
          </Flex>
          <Flex align="center" className={this.props.listingStore.filters.period === "sevenD" ? "highlighted" : ""}>
            <div className="square" />
            <Link to={"/listing/" + this.props.listingStore.filters.type + "/sevenD/" + this.props.listingStore.filters.sort + "/" + this.props.listingStore.filters.weight + window.location.search}>
              Last 7 days
            </Link>
          </Flex>
          <Flex className={this.props.listingStore.filters.period === "thirtyD" ? "highlighted" : ""} align="center">
            <div className="square" />
            <Link to={"/listing/" + this.props.listingStore.filters.type + "/thirtyD/" + this.props.listingStore.filters.sort + "/" + this.props.listingStore.filters.weight + window.location.search}>
              Last 30 days
            </Link>
          </Flex>
          <div className="divider_bar" />
        </Flex>
        <Flex className="sort" column align="start">
          <Flex className="sort_title">
            <Flex> Order by:</Flex>
          </Flex>
          <Flex column className="sort_content">
            <Flex align="center" className={this.props.listingStore.filters.sort === "1" ? "highlighted" : ""}>
              <div className="square" />
              <Link to={"/listing/" + this.props.listingStore.filters.type + "/" + this.props.listingStore.filters.period + "/1/" + this.props.listingStore.filters.weight + window.location.search}>
                Shares
              </Link>
            </Flex>
            <Flex align="center" className={this.props.listingStore.filters.sort === "2" ? "highlighted" : ""}>
              <div className="square" />
              <Link to={"/listing/" + this.props.listingStore.filters.type + "/" + this.props.listingStore.filters.period + "/2/" + this.props.listingStore.filters.weight + window.location.search}>
                Likes
              </Link>
            </Flex>
            <Flex align="center" className={this.props.listingStore.filters.sort === "3" ? "highlighted" : ""}>
              <div className="square" />
              <Link to={"/listing/" + this.props.listingStore.filters.type + "/" + this.props.listingStore.filters.period + "/3/" + this.props.listingStore.filters.weight + window.location.search}>
                Comments
              </Link>
            </Flex>
            <Flex align="center" className={this.props.listingStore.filters.sort === "4" ? "highlighted" : ""}>
              <div className="square" />
              <Link to={"/listing/" + this.props.listingStore.filters.type + "/" + this.props.listingStore.filters.period + "/4/" + this.props.listingStore.filters.weight + window.location.search}>
                Reactions
              </Link>
            </Flex>
            <div className="divider_bar" />
            <Flex className="sort_title fanbase">
              <Flex> Fanbase handicap:</Flex>
            </Flex>
            <Flex align="center">
              <Slider min={0} max={1} step={0.25} defaultValue={this.props.listingStore.filters.weight} handle={this.handle} onChange={this.onSlideChange} className="custom_slider" />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    );
  }
}

export default FilterBar;
