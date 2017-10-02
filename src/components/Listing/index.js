import React, { Component } from "react";
import PostPreviewList from "../PostPreviewList";

class Listing extends Component {
  render() {
    const apiPrefix = this.props.match.params.period;
    const apiSuffix = this.props.match.params.type === "v" ? "Videos" : "Posts";
    const type = this.props.match.params.type === "v" ? "video" : "post";
    return <PostPreviewList src={"http://localhost:1337/api/" + apiPrefix + apiSuffix + "?limit=100"} type={type} />;
  }
}

export default Listing;
