import React, { Component } from "react";

class Post extends Component {
  render() {
    return (
      <div>
        {!this.props.data.page && <h3>...</h3>}
        {this.props.data.page && <h3>{this.props.data.page.name} (fanbase: {new Intl.NumberFormat('en-UK').format(this.props.data.page.fan_count)})</h3>}
        {this.props.data.title && <h3>{this.props.data.title}</h3>}
      </div>
    );
  }
}

export default Post;
