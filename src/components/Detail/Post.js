import React, { Component } from "react";
import { FormattedNumber } from "react-intl";

class Post extends Component {
  render() {
    return (
      <div>
        <h3> {this.props.data.description}</h3>

        {!this.props.data.page && <h3>...</h3>}
        {this.props.data.page && <h3>Page name: {this.props.data.page.name}</h3>}
        {this.props.data.page && (
          <h3>
            Fan count: <FormattedNumber value={this.props.data.page.fan_count} />
          </h3>
        )}
      </div>
    );
  }
}

export default Post;
