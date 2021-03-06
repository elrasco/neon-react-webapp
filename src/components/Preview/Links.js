import React, { Component } from "react";
import { Box, Flex } from "reflexbox";
import "./index.css";

class Links extends Component {
  getPage() {
    if (this.pages) {
      if (this.props.publisher.post) {
        this.pageName = this.pages
          .filter(page => (this.props.publisher.post.page_id ? page.objectId === this.props.publisher.post.page_id : page.objectId === this.props.publisher.page_id))
          .map(page => page.name);
        this.pageImage = this.pages
          .filter(page => (this.props.publisher.post.page_id ? page.objectId === this.props.publisher.post.page_id : page.objectId === this.props.publisher.page_id))
          .map(page => page.picture);
      } else if (this.props.publisher.video) {
        this.pageName = this.pages
          .filter(page => (this.props.publisher.video.page_id ? page.objectId === this.props.publisher.video.page_id : page.objectId === this.props.publisher.page_id))
          .map(page => page.name);
        this.pageImage = this.pages
          .filter(page => (this.props.publisher.video.page_id ? page.objectId === this.props.publisher.video.page_id : page.objectId === this.props.publisher.page_id))
          .map(page => page.picture);
      }
    }
  }

  render() {
    this.getPage();
    return (
      <Box>
        <Flex column className="imgBox" justify="space-around" align="start">
          <img src={this.props.image} alt="post preview" />
        </Flex>
        <Flex className="publisher" justify="space-between" align="center">
          <Flex column align="start">
            {this.pageName}
            <Flex className="tile_country">
              <img src="https://s3.eu-central-1.amazonaws.com/smallfish-media/assets/images/shark/paese.svg" alt="" />
              <Flex>{this.props.publisher.country[0].id + ", " + this.props.publisher.country[1].id}</Flex>
            </Flex>
          </Flex>
          <img src={this.pageImage} alt="" />
        </Flex>
        <Flex className="description">{this.props.content.title || this.props.content.message}</Flex>
        <a href={"/detail/" + this.props.data.type + "/" + this.props.content.objectId} target="_blank">
          <Flex className="bar-chart" align="center">
            <img src="https://s3.eu-central-1.amazonaws.com/smallfish-media/assets/images/shark/ico_statistiche.svg" alt="Open graph" />
          </Flex>
        </a>
      </Box>
    );
  }
}

export default Links;
