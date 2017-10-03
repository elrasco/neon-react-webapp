import React, { Component } from "react";
import PostPreviewList from "../PostPreviewList";

class Listing extends Component {
  render() {
    const apiPrefix = this.props.match.params.period;
    const apiSuffix = this.props.match.params.type === "v" ? "Videos" : "Posts";
    const type = this.props.match.params.type === "v" ? "video" : "post";
    return <PostPreviewList src={process.env.REACT_APP_API_URL + "/api/" + apiPrefix + apiSuffix + "?limit=100"} type={type} />;
  }
}

export default Listing;
