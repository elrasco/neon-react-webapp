import React, { Component } from "react";
import { Flex, Box } from "reflexbox";
import Graph from "../Graph";
import Post from "./Post";

class Detail extends Component {
  constructor() {
    super();
    this.state = { post: {}, series: [] };
  }
  componentDidMount() {
    const apiHost = process.env.REACT_APP_API_URL;
    const apiPrefix = `${apiHost}/api/detail`;
    const object = `${this.props.match.params.type}/${this.props.match.params.objectId}`;
    const call = reaction => fetch(`${apiPrefix}/${object}/${reaction}`).then(response => response.json());

    let series = [];
    let calls = [];

    ["reactions", "comments", "likes", "shares"].forEach(r => {
      calls.push(call(r));
    });

    Promise.all(calls).then(([reactions, comments, likes, shares]) => {
      this.setState({ post: reactions.post });
      for (let i = 0; i < reactions.data.length; i++) {
        series.push({
          reactions_total_count: reactions.data[i].total_count,
          likes_total_count: likes.data[i].total_count,
          comments_total_count: comments.data[i].total_count,
          shares_total_count: shares.data[i].total_count,
          created_at: reactions.data[i].created_at,
          created_at_label: reactions.data[i].created_at_label,
          fromTheFirst: reactions.data[i].fromTheFirst
        });
      }
      this.setState({ series: series });
    });
  }

  render() {
    return (
      <Flex column>
        <Box>
          <Post data={this.state.post} />
        </Box>
        <Flex wrap w={1} p={2}>
          <Box w={0.8}>
            <Graph title={"Interactions"} data={this.state.series} />
            {this.state.series.length}
          </Box>
        </Flex>
      </Flex>
    );
  }
}

export default Detail;
