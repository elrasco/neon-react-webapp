import React, { Component } from "react";
import { Box } from "reflexbox";
import "./index.css";

class Links extends Component {
  render() {
    return (
      <Box>
        <img src={this.props.image} alt="" style={{ width: "160px", height: "160px" }} />
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
