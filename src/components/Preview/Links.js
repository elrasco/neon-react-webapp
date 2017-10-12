import React, { Component } from "react";
import { Box, Flex } from "reflexbox";
import "./index.css";
import Pages from "../../services/Pages";

class Links extends Component {
  constructor(props) {
    super(props);

    Pages.getAll().then(pages => {
      this.pages = pages;
    });
  }

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
        <Flex column justify="space-around" align="start">
          <Flex column className="imgBox">
            <img src={this.props.image} alt="" />
          </Flex>
          <Flex className="publisher" align="center">
            <img src={this.pageImage} alt="" />
            {this.pageName}
          </Flex>
          <div className="description">{this.props.content.title || this.props.content.message}</div>
        </Flex>
        <a href={"/detail/" + this.props.data.type + "/" + this.props.content.objectId} target="_blank">
          <i className="fa fa-bar-chart" aria-hidden="true" />
        </a>
      </Box>
    );
  }
}

export default Links;
