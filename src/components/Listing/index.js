import React, { Component } from "react";
import PostPreviewList from "../PostPreviewList";

import FilterBar from "./../FilterBar";
import FilterCategories from "./../FilterCategories";
import { observer, inject } from "mobx-react";
import queryString from "query-string";
import { Flex } from "reflexbox";

@inject("listingStore")
@observer
class Listing extends Component {
  constructor(props) {
    super(props);
    this.props.listingStore.history = this.props.history;
    this.props.location.search === "" || this.props.location.search === "?pages="
      ? (this.queryParamParsed = [])
      : (this.queryParamParsed = queryString.parse(this.props.location.search).pages.split(","));
    this.props.listingStore.changeFilters({
      type: this.props.match.params.type,
      period: this.props.match.params.period,
      sort: this.props.match.params.sort,
      weight: this.props.match.params.w,
      selectedPages: this.queryParamParsed
    });
  }
  componentWillReceiveProps(nextProps) {
    const isSomethingChanged = !Object.keys(this.props.listingStore.filters).every(k1 =>
      Object.keys(nextProps.match.params).some(k2 => this.props.listingStore.filters[k1] === nextProps.match.params[k2])
    );
    nextProps.location.search === "" || nextProps.location.search === "?pages="
      ? (this.queryParamParsed = [])
      : (this.queryParamParsed = queryString.parse(nextProps.location.search).pages.split(","));
    if (isSomethingChanged)
      this.props.listingStore.changeFilters({
        type: nextProps.match.params.type,
        period: nextProps.match.params.period,
        sort: nextProps.match.params.sort,
        weight: nextProps.match.params.w,
        selectedPages: this.queryParamParsed
      });
  }

  render() {
    let type = "";
    this.props.match.params.type === "v" ? (type = "video") : (type = "post");
    return (
      <Flex column>
        <Flex>
          <FilterBar period={this.props.match.params.period} type={type} />
          {this.props.listingStore.loader && <div className="loader">Loading</div>}
          <PostPreviewList data={this.props.listingStore.previews} type={type} period={this.props.match.params.period} />
          <FilterCategories />
        </Flex>
      </Flex>
    );
  }
}

export default Listing;
