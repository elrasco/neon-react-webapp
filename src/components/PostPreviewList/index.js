import React, { Component } from "react";
import { Flex, Box } from "reflexbox";
import { Link } from "react-router-dom";
import Preview from "../Preview";
import "./index.css";
import StackGrid from "react-stack-grid";

class PostPreviewList extends Component {
  constructor(props) {
    super(props);
    this.state = { previews: this.props.data, type: props.type || "video" };
  }
  render() {
    if (this.props.data.length > 0) {
      console.log(this.props.data[0].post, this.state.type);
      this.previews = this.props.data.map(p => {
        return <Preview auto key={p[this.state.type].objectId} object={p} type={this.state.type} />;
      });
    }

    return (
      <Box flex p={"2px"} className="PostPreviewList" {...this.props}>
        <Flex w={1} column>
          {!this.props.data && <div>Loading</div>}
          {this.props.data.length === 0 && this.state.type === "video" && <div>No videos available</div>}
          {this.props.data.length === 0 && this.state.type === "post" && <div>No posts available</div>}
          {this.props.data.length > 0 && (
            <StackGrid gutterWidth={20} gutterHeight={20} columnWidth={260}>
              {this.previews}
            </StackGrid>
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
