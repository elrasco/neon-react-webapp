import React, { Component } from "react";
import PostPreviewList from "../PostPreviewList";
import FilterBar from "./../FilterBar";

const loadContent = context => {
  const apiPrefix = context.props.match.params.period;
  const apiSuffix = context.props.match.params.type === "v" ? "Videos" : "Posts";
  const src = process.env.REACT_APP_API_URL + "/api/" + apiPrefix + apiSuffix + "?limit=20";
  if (context.localStorage.pages.length !== 0) {
    fetch(process.env.REACT_APP_API_URL + "/api/" + apiPrefix + apiSuffix + "/byPages/" + context.localStorage.pages.join(",") + "?limit=20")
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
    this.localStorage = JSON.parse(localStorage.getItem("PAGES-CHECKED"));
    loadContent(this);
  }

  mySubscriber = (msg, data) => {
    data = data.filter(d => !!d);
    const apiPrefix = this.props.match.params.period;
    const apiSuffix = this.props.match.params.type === "v" ? "Videos" : "Posts";
    const src = process.env.REACT_APP_API_URL + "/api/" + apiPrefix + apiSuffix + "?limit=20";
    if (data.length !== 0) {
      fetch(process.env.REACT_APP_API_URL + "/api/" + apiPrefix + apiSuffix + "/byPages/" + data.join(",") + "?limit=20")
        .then(response => response.json())
        .then(response => this.setState({ previews: response }));
    } else {
      fetch(src)
        .then(response => response.json())
        .then(response => this.setState({ previews: response }));
    }
  };

  render() {
    const period = this.props.match.params.period;
    let type = "";
    this.props.match.params.type === "v" ? (type = "video") : (type = "post");
    return (
      <div>
        <FilterBar period={period} type={type} />
        <PostPreviewList data={this.state.previews} type={type} />
      </div>
    );
  }
}

export default Listing;
