import React, { Component } from "react";
import PostPreviewList from "../PostPreviewList";

class Listing extends Component {

  constructor(props) {
    super(props);
    this.state = {previews: []};
  }

  componentDidMount() {
    const apiPrefix = this.props.match.params.period;
    const apiSuffix = this.props.match.params.type === "v" ? "Videos" : "Posts";
    const src = process.env.REACT_APP_API_URL + "/api/" + apiPrefix + apiSuffix + "?limit=100";
      fetch(src)
        .then(response => response.json())
        .then(response => {
          this.setState({ previews: response });
        });
  }
  
  render() {
    const type = this.props.match.params.type === "v" ? "video" : "post";
    return (
      <PostPreviewList data={this.state.previews}  type={type} />
    );
  }
}

export default Listing;
