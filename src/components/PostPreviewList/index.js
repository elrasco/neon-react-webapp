import React, { Component } from "react";
import { Flex, Box } from "reflexbox";
import { Link } from "react-router-dom";
import Preview from "../Preview";

class PostPreviewList extends Component {
  constructor(props) {
    super(props);
    this.state = { previews: this.props.data, type: props.type || "video" };
  }

  render() {
    let previews = this.props.data.map(p => {
      return <Preview auto key={p[this.state.type].objectId} object={p} type={this.state.type} />;
    });
    return (
      <Box flex p={"2px"} className="PostPreviewList" {...this.props}>
        <Flex w={1} column>
          {this.props.data.length === 0 && <div>No videos</div>}
          {this.props.data.length > 0 && (
            <Flex w={1} align={"center"} justify="space-around" wrap order={1}>
              {previews}
            </Flex>
          )}
          <Box auto justify="center" flex p={"5px"} pb={"0"} order={1}>
            {this.props.linkTo && <Link to={this.props.linkTo}>{this.props.linkName}</Link>}
          </Box>
        </Flex>
      </Box>
    );
  }
}

export default PostPreviewList;
