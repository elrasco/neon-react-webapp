import React, { Component } from "react";
import { FormattedNumber } from "react-intl";
import { Flex, Box } from "reflexbox";

class Post extends Component {
  render() {
    return (
      <Box w={0.8} p={2} className="Post">
        {!this.props.data.page && <div>...</div>}
        {this.props.data.page && (
          <Flex column>
            <div className="post_page">
              Page:<strong> {this.props.data.page.name}</strong>{" "}
            </div>
            <div className="page_fanbase">
              Fanbase:{" "}
              <strong>
                <FormattedNumber value={this.props.data.page.fan_count} />
              </strong>
            </div>
          </Flex>
        )}
        <Flex className="post_name_link" w={1} justify="space-between" align="center">
          {this.props.data.title && <h2>{this.props.data.title}</h2>}
          {!this.props.data.title && <h2>Untitled</h2>}
          <a href={"http://facebook.com/" + this.props.data.objectId} target="_blank">
            <Flex className="see_post" w={1} align="center">
              <div>See post</div>
              <img src="https://s3.eu-central-1.amazonaws.com/smallfish-media/assets/images/shark/eye.svg" alt="" />
            </Flex>
          </a>
        </Flex>
      </Box>
    );
  }
}

export default Post;
