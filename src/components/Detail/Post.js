import React, { Component } from "react";
import { Flex, Box } from "reflexbox";

class Post extends Component {
  render() {
    return (
      <Box w={1} p={2}>
        {!this.props.data.page && <div>...</div>}
        {this.props.data.page && <Flex column>
          <div>Page: {this.props.data.page.name} </div>
          <div>Fanbase: {new Intl.NumberFormat('en-UK').format(this.props.data.page.fan_count)}</div>
            </Flex>}
        <Flex column w={1} align='start'>
        {this.props.data.title && 
          <h2>{this.props.data.title}</h2>}
          <a href={"http://facebook.com/" + this.props.data.objectId} target="_blank">
          <Flex w={1} >
            <div>See post</div>
            <i className="fa fa-paper-plane-o" aria-hidden="true" />
          </Flex>
          </a>
        </Flex>
      </Box>
    );
  }
}

export default Post;
