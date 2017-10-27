import React, { Component } from "react";
import PostPreviewList from "../PostPreviewList";
import FilterBar from "./../FilterBar";
import { observer, inject } from "mobx-react";
import queryString from "query-string";

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
      selectedPages: this.queryParamParsed
    });
  }
  componentWillReceiveProps(nextProps) {
    nextProps.location.search === "" || nextProps.location.search === "?pages="
      ? (this.queryParamParsed = [])
      : (this.queryParamParsed = queryString.parse(nextProps.location.search).pages.split(","));
    this.props.listingStore.changeFilters({
      type: nextProps.match.params.type,
      period: nextProps.match.params.period,
      selectedPages: this.queryParamParsed
    });
  }

  render() {
    let type = "";
    this.props.match.params.type === "v" ? (type = "video") : (type = "post");
    return (
      <div>
        <FilterBar period={this.props.match.params.period} type={type} />
        {this.props.listingStore.loader && <div className="loader">Loading</div>}
        <PostPreviewList data={this.props.listingStore.previews} type={type} period={this.props.match.params.period} />
      </div>
    );
  }
}

export default Listing;
