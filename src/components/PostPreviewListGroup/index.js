import React, { Component } from "react";
import { Flex } from "reflexbox";
import PostPreviewList from "../PostPreviewList";
import "./index.css";

class PostPreviewListGroup extends Component {
  constructor(props) {
    super(props);
    this.state = { video_previews: [], post_previews: [], loadingPosts: false, loadingVideos: false };
    localStorage.setItem("PAGES-CHECKED", JSON.stringify({ pages: [] }));
  }

  filterPost(pages) {
    fetch(process.env.REACT_APP_API_URL + "/api/" + this.props.apiPrefix + "Videos/byPages/" + pages.join(",") + "?limit=3")
      .then(response => response.json())
      .then(posts => this.setState({ video_previews: posts, loadingPosts: false }));

    fetch(process.env.REACT_APP_API_URL + "/api/" + this.props.apiPrefix + "Posts/byPages/" + pages.join(",") + "?limit=3")
      .then(response => response.json())
      .then(posts => this.setState({ post_previews: posts, loadingVideos: false }));
  }
  solveProsises(videos, posts) {
    return Promise.all([videos, posts]).then(([videos, posts]) => {
      this.setState({ video_previews: videos, post_previews: posts });
    });
  }

  componentDidMount() {
    const apiPrefix = this.props.apiPrefix;
    const srcVideo = process.env.REACT_APP_API_URL + "/api/" + apiPrefix + "Videos?limit=10";
    const srcPosts = process.env.REACT_APP_API_URL + "/api/" + apiPrefix + "Posts?limit=3";
    const fetchVideos = fetch(srcVideo).then(v => v.json());
    const fetchPosts = fetch(srcPosts).then(p => p.json());
    this.solveProsises(fetchVideos, fetchPosts);

    setInterval(() => {
      const storage = JSON.parse(localStorage.getItem("PAGES-CHECKED"));
      const currentRead = JSON.parse(localStorage.getItem("PAGES-CHECKED-" + this.props.apiPrefix) || "{}").created;
      if (storage.pages.length > 0 && currentRead !== storage.created) {
        this.setState({ loadingPosts: true, loadingVideos: true });
        this.filterPost(storage.pages);
        localStorage.setItem("PAGES-CHECKED-" + this.props.apiPrefix, JSON.stringify({ created: storage.created }));
      } else if (storage.pages.length === 0 && currentRead !== storage.created) {
        localStorage.setItem("PAGES-CHECKED-" + this.props.apiPrefix, JSON.stringify({ created: storage.created }));
        this.solveProsises(fetchVideos, fetchPosts);
      }
    }, 500);
  }

  render() {
    return (
      <Flex>
        {(this.state.loadingPosts || this.state.loadingVideos) && <div className="loader">Loading...</div>}
        <Flex align={"center"} p={"5px"} className="PostPreviewListContainer" auto>
          <PostPreviewList data={this.state.video_previews} linkName={"more"} linkTo={"/listing/v/" + this.props.apiPrefix} w={1} />
          {/* <PostPreviewList data={this.state.post_previews} type="post" linkName={"more"} linkTo={"/listing/p/" + this.props.apiPrefix} w={0.5} /> */}
        </Flex>
      </Flex>
    );
  }
}

export default PostPreviewListGroup;
