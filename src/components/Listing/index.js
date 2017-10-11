import React, { Component } from "react";
import PostPreviewList from "../PostPreviewList";
import FilterPeriod from "./../FilterPeriod";

const loadContent = context => {
  const apiPrefix = context.props.match.params.period;
  const apiSuffix = context.props.match.params.type === "v" ? "Videos" : "Posts";
  const src = process.env.REACT_APP_API_URL + "/api/" + apiPrefix + apiSuffix + "?limit=100";
  if (context.localStorage.pages.length !== 0) {
    fetch(process.env.REACT_APP_API_URL + "/api/" + apiPrefix + apiSuffix + "/byPages/" + context.localStorage.pages.join(",") + "?limit=100")
      .then(response => response.json())
      .then(posts => {
        context.setState({ previews: posts });
      });
  } else {
    fetch(src)
      .then(response => response.json())
      .then(response => {
        context.setState({ previews: response });
      });
  }
};

class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = { previews: [] };
    this.localStorage = JSON.parse(localStorage.getItem("PAGES-CHECKED"));
  }

  componentDidMount() {
    loadContent(this);
  }
  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
    loadContent(this);
  }

  render() {
    const type = this.props.match.params.type === "v" ? "video" : "post";
    return (
      <div>
        <FilterPeriod />
        <PostPreviewList data={this.state.previews} type={type} />
      </div>
    );
  }
}

export default Listing;
