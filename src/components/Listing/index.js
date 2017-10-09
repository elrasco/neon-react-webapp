import React, { Component } from "react";
import PostPreviewList from "../PostPreviewList";
import FilterBar from "../FilterBar";

class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = { previews: [] };
    this.localStorage = JSON.parse(localStorage.getItem("PAGES-CHECKED"));
  }

  componentDidMount() {
    const apiPrefix = this.props.match.params.period;
    const apiSuffix = this.props.match.params.type === "v" ? "Videos" : "Posts";
    const src = process.env.REACT_APP_API_URL + "/api/" + apiPrefix + apiSuffix + "?limit=100";
    const currentRead = JSON.parse(localStorage.getItem("PAGES-CHECKED-" + apiPrefix) || "{}").created;
    if (this.localStorage.pages.length !== 0) {
      fetch(process.env.REACT_APP_API_URL + "/api/" + apiPrefix + apiSuffix + "/byPages/" + this.localStorage.pages.join(",") + "?limit=100")
        .then(response => response.json())
        .then(posts => {
          this.setState({ previews: posts });
        });
    } else {
      fetch(src)
        .then(response => response.json())
        .then(response => {
          this.setState({ previews: response });
        });
    }
  }

  render() {
    const type = this.props.match.params.type === "v" ? "video" : "post";
    return (
      <div>
        <PostPreviewList data={this.state.previews} type={type} />
      </div>
    );
  }
}

export default Listing;
