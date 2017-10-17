import React, { Component } from "react";
import PostPreviewList from "../PostPreviewList";
import FilterBar from "./../FilterBar";
import { observer, inject } from "mobx-react";
import queryString from "query-string";

@inject("store")
@observer
class Listing extends Component {
  constructor(props) {
    super(props);
    this.props.store.getLocation(this.props.location);
    this.queryParamParsed = queryString.parse(this.props.store.location.search).pages || [];
    this.props.store.changeFilters({
      type: this.props.match.params.type,
      period: this.props.match.params.period,
      selectedPages: this.queryParamParsed
    });
  }
  componentWillReceiveProps(nextProps) {
    this.props.store.changeFilters({
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
        <PostPreviewList data={this.props.store.previews} type={type} period={this.props.match.params.period} />
      </div>
    );
  }
}

export default Listing;
