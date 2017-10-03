import React, { Component } from "react";
import { Flex, Box } from "reflexbox";
import Graph from "../Graph";
import Post from "./Post";

class Detail extends Component {
  constructor() {
    super();
    this.state = { comments: [], reactions: [], likes: [], shares: [], post: {} };
  }
  componentDidMount() {
    const apiHost = "http://localhost:1337";
    const apiPrefix = `${apiHost}/api/detail`;
    const object = `${this.props.match.params.type}/${this.props.match.params.objectId}`;

    const call = reaction => fetch(`${apiPrefix}/${object}/${reaction}`).then(response => response.json());

    ["reactions", "comments", "likes", "shares"].forEach(r => {
      call(r).then(data => {
        let newstate;
        switch (r) {
          case "reactions":
            newstate = { reactions: data.data };
            break;
          case "comments":
            newstate = { comments: data.data };
            break;
          case "likes":
            newstate = { likes: data.data };
            break;
          case "shares":
            newstate = { shares: data.data };
            break;
          default:
            break;
        }
        this.setState(Object.assign(newstate, { post: data.post }));
      });
    });
  }

  render() {
    return (
      <Flex column>
        <Box>
          <Post data={this.state.post} />
        </Box>
        <Flex wrap w={1} p={2}>
          <Box w={0.45}>
            <Graph title={"Reactions"} data={this.state.reactions} />
          </Box>
          <Box w={0.45}>
            <Graph title={"Comments"} data={this.state.comments} />
          </Box>
          <Box w={0.45}>
            <Graph title={"Likes"} data={this.state.likes} />
          </Box>
          <Box w={0.45}>
            <Graph title={"Shares"} data={this.state.shares} />
          </Box>
        </Flex>
      </Flex>
    );
  }
}

export default Detail;
