import React, { Component } from "react";
import { Box, Flex } from "reflexbox";
import "./index.css";

class Links extends Component {
  render() {
    console.log(this.props);
    return (
      <Box>
        <Flex className="imgBox" column justify="space-around" align="center">
          <img src={this.props.image} alt="" />
          <div className="description">{this.props.content.description}</div>
        </Flex>
        <a href={"/detail/" + this.props.data.type + "/" + this.props.content.objectId} target="_blank">
          <i className="fa fa-bar-chart" aria-hidden="true" />
        </a>
        {this.props.data.object.video && (
          <a href={"http://www.facebook.com/" + this.props.data.object.video.objectId} target="_blank">
            <i className="fa fa-paper-plane-o" aria-hidden="true" />
          </a>
        )}
        {this.props.data.object.post && (
          <a href={"http://facebook.com/" + this.props.data.object.post.objectId} target="_blank">
            <i className="fa fa-paper-plane-o" aria-hidden="true" />
          </a>
        )}
      </Box>
    );
  }
}

export default Links;
