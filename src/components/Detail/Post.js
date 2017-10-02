import React, { Component } from "react";

class Post extends Component {
  render() {
    return (
      <div>
        {!this.props.data.page && <h3>...</h3>}
        {this.props.data.page && <h3>{this.props.data.page.name}</h3>}
      </div>
    );
  }
}

export default Post;
